import { useContext, useState, useEffect } from "react";
import PlayerContext from "../context/playerContext";
import EnemyContext from "../context/enemyContext";
import { attackRoll } from "../helpers/attack";
import WeaponList from "./WeaponList";
import PowerList from "./PowerList";
import ItemList from "./ItemList.jsx";
import { usePlayerPower } from "../helpers/playerPowers.js";
import { useEnemyPower } from "../helpers/enemyPowers.js";
import { useEnemyItem } from "../helpers/enemyItems.js";
import { enemyTurnTactic } from "../helpers/enemyAI.js";
import ConsoleLogDisplay from "./ConsoleLogDisplay.jsx";
import { useItem } from "../helpers/items.js";
import enemyObj from "../db/enemyData.js";
import beginnierEnemyDatabase from "../db/enemyDatabase.js";
import "../styles/Combat.scss";
import StatDisplay from "./StatDisplay.jsx";
import GameLog from "./GameLog.jsx";
import HealthBar from "./HealthBar";

// There is a bug where if the enemy defeats the player at the same time
// May be fixed with the initative system when I do that
function Combat({ log, addLogEntry }) {
  const [turn, setTurn] = useState(0);
  const [battleOver, setBattleOver] = useState(false);
  const [targetEnemy, setTargetEnemy] = useState(0);
  const [combatOption, setcombatOption] = useState(4);
  const [surprised, setSurprised] = useState(true);
  const { player, setPlayer } = useContext(PlayerContext);
  const { enemy, setEnemy } = useContext(EnemyContext);
  const [playerAnimation, setPlayerAnimation] = useState(false);
  const [enemyAnimation, setEnemyAnimation] = useState(false);

  const handleSelectChange = (index) => {
    // Check if targetEnemy is not null and is a valid index
    if (targetEnemy !== null && enemy[targetEnemy]) {
      const previousTarget = enemy[targetEnemy];
      // Remove targeted class from previously targeted enemy
      if (previousTarget && previousTarget.classList) {
        previousTarget.classList.remove("targeted", "enemyUnitSprite");
      }
    }

    // Set the new targetEnemy index
    setTargetEnemy(index);

    // Apply the targeted class to the clicked enemy
    const clickedEnemy = enemy[index];
    if (clickedEnemy && clickedEnemy.classList) {
      clickedEnemy.classList.add("targeted", "enemyUnitSprite");
    }
  };

  // This is used to for the targeting drop down
  const changeCombatOption = (event) => {
    if (event === combatOption) {
      return setcombatOption(0);
    }
    setcombatOption(event);
  };

  const showState = function () {
    console.log(log);
    console.log(player);
    console.log(enemy);
  };

  const increasePlayerScore = function (currentPlayerStats, defeatedEnemy) {
    const tempPlayer = currentPlayerStats;
    tempPlayer.scores.points += defeatedEnemy.scores.points;
    tempPlayer.scores.money += defeatedEnemy.scores.money;
    return tempPlayer;
  };

  // Will change the turn between player and enemy, will only work for 2 entities.
  const setNextRound = function () {
    const maxEnemyDBLength = beginnierEnemyDatabase.length;
    const newEnemyIndex = Math.random() * (maxEnemyDBLength - 1);
    const tempNewEnemyStats = beginnierEnemyDatabase[newEnemyIndex];
    let tempPlayerStats = player;
    tempPlayerStats.scores.stage++;

    setSurprised(true);
    setTurn(0);
    setBattleOver(false);
    setPlayer(tempPlayerStats);
    setEnemy([tempNewEnemyStats]);
    addLogEntry([`Round ${player.scores.stage} begins!`]);
  };

  const handleCharacterMoveAnimation = function (direction) {
    // Simulate the animation delay (adjust as needed)
    const delay = 400;
    if (direction === "player") {
      setPlayerAnimation(true);
      setTimeout(() => {
        setPlayerAnimation(false);
      }, delay);
    } else if (direction === "enemy") {
      setEnemyAnimation(true);
      setTimeout(() => {
        setEnemyAnimation(false);
      }, delay);
    }
  };

  // Will change the turn between player and enemy, will only work for 2 entities.
  // This may be broken
  const changeTurn = function () {
    turn === 0 ? setTurn(1) : setTurn(0);
  };

  const checkAllEnemyDefeated = function () {
    if (enemy.length > 0) {
      return false;
    }
    return true;
  };

  const checkPlayerDefeated = function () {
    if (player.stats.currentWounds > 0) {
      return false;
    }
    return true;
  };

  const resolveAttackCycle = function (
    combatTeam,
    weaponIndex,
    attacker,
    defender
  ) {
    const statsAfterAttack = attackRoll(weaponIndex, attacker, defender);
    const updatedStats = statsAfterAttack.updatedTargetStats;
    const attackCycleLog = statsAfterAttack.attackLog;
    return { combatTeam, updatedStats, attackCycleLog };
  };

  const handleEnemyPowers = function (
    powerIndex,
    currentEnemyUser,
    currentPlayerTarget,
    currentEnemyIndex
  ) {
    const statsAfterPower = useEnemyPower(
      powerIndex,
      currentEnemyUser,
      currentPlayerTarget,
      currentEnemyIndex
    );
    return statsAfterPower;
  };

  const resolveEnemyTurnActions = function () {
    // Makes a copy of the player and enemy states to operate on these rather then the direct state
    let tempPlayerStats = { ...player };
    let tempEnemyStats = [...enemy];
    const enemyTurnLog = [];
    handleCharacterMoveAnimation("enemy");
    // Index matters, loops through the enemy array to do each of their turns.
    for (let i = 0; i < tempEnemyStats.length; i++) {
      // If an enemy is alive, allow them to act
      if (tempEnemyStats[i].stats.currentWounds > 0) {
        // Calls the tactic function which returns an index and an option
        const enemyTurn = enemyTurnTactic(tempEnemyStats[i], player);
        // If Index is 1 it will attack
        if (enemyTurn.chosenTypeIndex === 1) {
          let statsAfterEnemyAttack = resolveAttackCycle(
            0,
            enemyTurn.chosenOptionIndex,
            tempEnemyStats[i],
            tempPlayerStats
          );
          // Since attacking only modifies the player health at this time, only need to update the player health
          tempPlayerStats = statsAfterEnemyAttack.updatedStats;
          enemyTurnLog.push(statsAfterEnemyAttack.attackCycleLog);
        }

        // If Index is 2 it will use a power
        if (enemyTurn.chosenTypeIndex === 2) {
          const enemyPowerData =
            tempEnemyStats[i].powers[enemyTurn.chosenOptionIndex];
          let statsAfterEnemyPower = handleEnemyPowers(
            enemyPowerData,
            tempEnemyStats[i],
            tempPlayerStats,
            i
          );
          enemyTurnLog.push(statsAfterEnemyPower.enemyPowerLog);

          // If the power targets the player modify their stats
          if (statsAfterEnemyPower.combatTeam === 0) {
            tempPlayerStats = statsAfterEnemyPower.updatedStats;
          }
          // If he power targets the enemy side modify the target of the power
          if (statsAfterEnemyPower.combatTeam === 1) {
            tempEnemyStats[statsAfterEnemyPower.targetID] =
              statsAfterEnemyPower.updatedStats;
          }
        }
        // If Index is 3 it will use an item
        if (enemyTurn.chosenTypeIndex === 3) {
          const enemyItemData =
            tempEnemyStats[i].items[enemyTurn.chosenOptionIndex];
          let statsAfterEnemyItem = useEnemyItem(
            enemyTurn.chosenOptionIndex,
            enemyItemData,
            tempEnemyStats[i],
            tempPlayerStats,
            i
          );
          enemyTurnLog.push(statsAfterEnemyItem.enemyItemLog);
          // If the item targets the player modify their stats
          if (statsAfterEnemyItem.combatTeam === 0) {
            tempPlayerStats = statsAfterEnemyItem.updatedStats;
          }
          // If the item targets the enemy side modify the target of the power
          if (statsAfterEnemyItem.combatTeam === 1) {
            tempEnemyStats[statsAfterEnemyItem.targetID] =
              statsAfterEnemyItem.updatedStats;
          }
        }
      }
      // If an enemy is found to be at 0 or less wounds remove them from the game
      if (tempEnemyStats[i].stats.currentWounds <= 0) {
        tempPlayerStats = increasePlayerScore(
          tempPlayerStats,
          tempEnemyStats[i]
        );
        tempEnemyStats.splice(i, 1);
        i--; // Decrement i to account for the removed element
      } else {
        console.log("Remaining enemy:", tempEnemyStats[i].information.name);
      }
    }

    return { tempEnemyStats, tempPlayerStats, enemyTurnLog };
  };

  // Will check if any entities have 0 or less health, if there are the combat ends
  const checkIfCombatIsOver = function () {
    if (checkPlayerDefeated() || checkAllEnemyDefeated()) {
      setBattleOver(true);
      return;
    }
    if (!battleOver && turn !== 0) {
      // Iterate through each enemy and let them have a turn
      const updatedEnemies = resolveEnemyTurnActions();
      // If an enemy was found to be removed reset the targeted enemy.
      if (updatedEnemies.tempEnemyStats.length < enemy.length) {
        setTargetEnemy(0);
      }
      // Update the enemy state after processing all enemies
      setPlayer(updatedEnemies.tempPlayerStats);
      setEnemy(updatedEnemies.tempEnemyStats);

      // Add all the new log entries at once
      addLogEntry(updatedEnemies.enemyTurnLog);
    }
  };

  // This is the function that is called when an attack button is clicked
  const handleWeaponsOnClick = function (weaponID) {
    handleCharacterMoveAnimation("player");
    const weaponIndex = player.weapons.findIndex(
      (weapon) => weapon.id === weaponID
    );
    const statsAfterAttack = resolveAttackCycle(
      1,
      weaponIndex,
      player,
      enemy[targetEnemy]
    ); // The 1 is the enemy side
    addLogEntry(statsAfterAttack.attackCycleLog);
    updateStats(1, targetEnemy, statsAfterAttack.updatedStats);
  };

  // This is the function that is called when a power button is clicked
  const handlePlayerPowers = function (powerID) {
    handleCharacterMoveAnimation("player");
    const powerIndex = player.powers.findIndex((power) => power.id === powerID);
    const powerData = player.powers[powerIndex];
    const statsAfterPower = usePlayerPower(
      powerData,
      player,
      enemy[targetEnemy],
      targetEnemy
    );
    addLogEntry(statsAfterPower.playerPowerLog);
    if (statsAfterPower.combatTeam >= 0) {
      updateStats(
        statsAfterPower.combatTeam,
        statsAfterPower.targetID,
        statsAfterPower.updatedStats
      );
    }
  };

  // This is the function that is called when an item button is clicked
  const handleItemsOnClick = function (itemID) {
    handleCharacterMoveAnimation("player");
    const itemIndex = player.items.findIndex((item) => item.id === itemID);
    const itemData = player.items[itemIndex];
    const statsAfterItem = useItem(
      itemIndex,
      itemData,
      player,
      enemy[targetEnemy]
    );
    addLogEntry(statsAfterItem.playerItemLog);
    updateStats(
      statsAfterItem.combatTeam,
      statsAfterItem.targetID,
      statsAfterItem.updatedStats,
      targetEnemy
    );
  };

  const updateEnemyStats = (index, newStats) => {
    setEnemy((prevEnemy) => {
      return prevEnemy.map((enemy, i) => {
        // If the current index matches the target index, update the stats
        if (i === index) {
          return { ...enemy, ...newStats };
        } else {
          // Otherwise, keep the current enemy object unchanged
          return enemy;
        }
      });
    });
  };

  const updateStats = function (combatTeam, targetID, newStats) {
    if (combatTeam === 0) {
      return setPlayer((prevPlayer) => ({ ...prevPlayer, ...newStats }));
    }
    updateEnemyStats(targetID, newStats);
    return;
  };

  // Constantly checks if combat is over
  // The end turn doesnt work for all enemies, right now I'll leave it to the main enemy
  useEffect(() => {
    changeTurn();
    if (surprised === false) {
      checkIfCombatIsOver(player, enemy[0]);
    }
  }, [player, enemy]);

  return (
    <div>
      <button onClick={() => showState()}>SHOW STATE</button>
      <div>You are playing as: {player.information.name}</div>
      <div>Player Health: {player.stats.currentWounds}</div>
      <div>
        Enemy Health:
        {enemy.map((enemyUnit, index) => (
          <div key={index}>
            {enemyUnit.information.name}: {enemyUnit.stats.currentWounds}
          </div>
        ))}
      </div>
      <div className="combatScreen">
        <div className="gameLog">
          <GameLog log={log} />
        </div>
        <div className="battleDisplay">
          <div className="healthBarDisplay">
            {enemy[targetEnemy] && (
              <HealthBar
                targetEnemyName={enemy[targetEnemy].information.name}
                currentHealth={enemy[targetEnemy].stats.currentWounds}
                maxHealth={enemy[targetEnemy].stats.wounds}
              />
            )}
          </div>
          <div className="battleSprites">
            <div
              className={`playerSprite ${playerAnimation && "moveRight"}`}
            ></div>
            <div className="enemySprites">
              {enemy.map((enemyUnit, index) => {
                return (
                  <div
                    key={index}
                    className={`enemyUnitSprite ${enemyAnimation && "moveLeft"} 
                    ${index === targetEnemy ? "targeted" : ""} ${
                      enemyUnit.size
                    }`}
                    onClick={() => handleSelectChange(index)}
                  ></div>
                );
              })}
            </div>
          </div>
          {!battleOver && !surprised && turn === 1 && (
            <div className="combatOptions">
              <div className="optionList">
                <div
                  onClick={() => changeCombatOption(1)}
                  className={combatOption === 1 ? "selected" : ""}
                >
                  Attacks
                </div>
                <div
                  onClick={() => changeCombatOption(2)}
                  className={combatOption === 2 ? "selected" : ""}
                >
                  Powers
                </div>
                <div
                  onClick={() => changeCombatOption(3)}
                  className={combatOption === 3 ? "selected" : ""}
                >
                  Items
                </div>
                <div
                  onClick={() => changeCombatOption(4)}
                  className={combatOption === 4 ? "selected" : ""}
                >
                  Stats
                </div>
              </div>
              <div className="combatButtons">
                {/* Displaying the options for weapon attacks */}
                <div className="weaponList">
                  {combatOption === 1 &&
                    player.weapons.map((item, index) => (
                      <WeaponList
                        key={index}
                        id={player.weapons[index].id}
                        name={player.weapons[index].name}
                        handleWeaponsOnClick={handleWeaponsOnClick}
                      />
                    ))}
                </div>
                {/* Displaying the options for power attacks */}
                <div className="powerList">
                  {combatOption === 2 &&
                    player.powers.map((power, index) => (
                      <PowerList
                        key={index}
                        id={power.id}
                        name={power.name}
                        handlePowersOnClick={handlePlayerPowers}
                      />
                    ))}
                </div>
                {/* Displaying the options for item use */}
                <div className="itemList">
                  {combatOption === 3 &&
                    player.items.map((item, index) => (
                      <ItemList
                        key={index}
                        id={item.id}
                        name={item.name}
                        amount={item.amount}
                        handleItemsOnClick={handleItemsOnClick}
                      />
                    ))}
                </div>
                {/* Displaying stats */}
                <div className="statList">
                  {combatOption === 4 && <StatDisplay />}
                </div>
              </div>
            </div>
          )}
          {player.stats.currentWounds > 0 && battleOver && (
            <button className="bottomButton" onClick={() => setNextRound()}>
              Next Round!
            </button>
          )}
          {surprised && !battleOver && (
            <button className="bottomButton"
              onClick={() => {
                addLogEntry(["The enemy has the iniative"]);
                checkIfCombatIsOver(player, enemy[0]);
                setSurprised(false);
                setTurn(0);
              }}
            >
              Surprise
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Combat;
