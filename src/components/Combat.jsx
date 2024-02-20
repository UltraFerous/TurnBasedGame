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

// There is a bug where if the enemy defeats the player at the same time
// May be fixed with the initative system when I do that
function Combat() {
  const [turn, setTurn] = useState(0);
  const [battleOver, setBattleOver] = useState(false);
  const [targetEnemy, setTargetEnemy] = useState(0);
  const { player, setPlayer } = useContext(PlayerContext);
  const { enemy, setEnemy } = useContext(EnemyContext);

  // This is used to for the targeting drop down
  const handleSelectChange = (event) => {
    const selectedIndex = parseInt(event.target.value, 10);
    setTargetEnemy(selectedIndex);
  };

  const showState = function () {
    console.log(targetEnemy);
    console.log(player);
    console.log(enemy);
  };

  // Will change the turn between player and enemy, will only work for 2 entities.
  const changeTurn = function () {
    turn === 0 ? setTurn(1) : setTurn(0);
  };

  const checkAllEnemyDefeated = function () {
    for (let unit of enemy) {
      if (unit.stats.currentWounds > 0) {
        return false;
      }
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
    const updatedStats = attackRoll(weaponIndex, attacker, defender);
    return { combatTeam, updatedStats };
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
        }
        // If Index is 2 it will use a power
        if (enemyTurn.chosenTypeIndex === 2) {
          let statsAfterEnemyPower = handleEnemyPowers(
            enemyTurn.chosenOptionIndex,
            tempEnemyStats[i],
            tempPlayerStats,
            i
          );
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
          let statsAfterEnemyPower = useEnemyItem(
            enemyTurn.chosenOptionIndex,
            tempEnemyStats[i],
            tempPlayerStats,
            i
          );
          // If the item targets the player modify their stats
          if (statsAfterEnemyPower.combatTeam === 0) {
            tempPlayerStats = statsAfterEnemyPower.updatedStats;
          }
          // If he item targets the enemy side modify the target of the power
          if (statsAfterEnemyPower.combatTeam === 1) {
            tempEnemyStats[statsAfterEnemyPower.targetID] =
              statsAfterEnemyPower.updatedStats;
          }
        }
      }
      // If an enemy is found to be at 0 or less wounds remove them from the game
      if (tempEnemyStats[i].stats.currentWounds <= 0) {
        tempEnemyStats.splice(i, 1);
        i--; // Decrement i to account for the removed element
      } else {
        console.log("Remaining enemy:", tempEnemyStats[i].information.name);
      }
    }

    return { tempEnemyStats, tempPlayerStats };
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
    }
  };

  // This is the function that is called when an attack button is clicked
  const handleWeaponsOnClick = function (weaponID) {
    const weaponIndex = player.weapons.findIndex(
      (weapon) => weapon.id === weaponID
    );
    const statsAfterAttack = resolveAttackCycle(
      1,
      weaponIndex,
      player,
      enemy[targetEnemy]
    ); // The 1 is the enemy side
    updateStats(1, targetEnemy, statsAfterAttack.updatedStats);
  };

  // This is the function that is called when a power button is clicked
  const handlePlayerPowers = function (powerID) {
    const powerIndex = player.powers.findIndex((power) => power.id === powerID);
    const statsAfterPower = usePlayerPower(
      powerIndex,
      player,
      enemy[targetEnemy],
      targetEnemy
    );
    if (statsAfterPower.combatTeam >= 0) {
      updateStats(
        statsAfterPower.combatTeam,
        statsAfterPower.targetID,
        statsAfterPower.updatedStats
      );
    }
  };

  // This is the function that is called when an item button is clicked
  const handleItemsOnClick = function (itemIndex) {
    const statsAfterItem = useItem(itemIndex, player, enemy[targetEnemy]);
    updateStats(
      statsAfterItem.combatTeam,
      statsAfterItem.targetID,
      statsAfterItem.updatedStats
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
    checkIfCombatIsOver(player, enemy[0]);
  }, [player, enemy]);

  return (
    <div>
      <button onClick={() => showState()}>SHOW STATE</button>
      <div>
        Select target:
        {!battleOver && (
          <select value={targetEnemy} onChange={handleSelectChange}>
            {enemy.map((enemyUnit, index) => (
              <option value={index} key={index}>
                {enemyUnit.information.name}
              </option>
            ))}
          </select>
        )}
      </div>
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
      {battleOver === false ? (
        <div>
          {/* Displaying the options for weapon attacks */}
          <div>
            <strong>Weapons:</strong>
            {player.weapons.map((item, index) => (
              <WeaponList
                key={player.weapons[index].id}
                id={player.weapons[index].id}
                name={player.weapons[index].name}
                handleWeaponsOnClick={handleWeaponsOnClick}
              />
            ))}
          </div>
          {/* Displaying the options for power attacks */}
          <div>
            <strong>Powers:</strong>
            {player.powers.map((power, index) => (
              <PowerList
                key={power.id}
                id={power.id}
                name={power.name}
                handlePowersOnClick={handlePlayerPowers}
              />
            ))}
          </div>
          {/* Displaying the options for item use */}
          <div>
            <strong>Items:</strong>
            {player.items.map((item, index) => (
              <ItemList
                key={item.id}
                id={item.id}
                name={item.name}
                amount={item.amount}
                handleItemsOnClick={handleItemsOnClick}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>Battle Over!</div>
      )}
    </div>
  );
}

export default Combat;
