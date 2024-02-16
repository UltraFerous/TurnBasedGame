import { useContext, useState, useEffect } from "react";
import PlayerContext from "../context/playerContext";
import EnemyContext from "../context/enemyContext";
import { attackRoll } from "../helpers/attack";
import WeaponList from "./WeaponList";
import PowerList from "./PowerList";
import ItemList from "./ItemList.jsx";
import { usePlayerPower } from "../helpers/playerPowers.js";
import { enemyTurnTactic } from "../helpers/enemyAI.js";
import ConsoleLogDisplay from "./ConsoleLogDisplay.jsx";
import { useItem } from "../helpers/items.js";

// There is a bug where if the enemy defeats the player at the same time
// May be fixed with the initative system when I do that
function Combat() {
  const [turn, setTurn] = useState(0);
  const [battleOver, setbattleOver] = useState(false);
  const [targetEnemy, setTargetEnemy] = useState(0);
  const { player, setPlayer } = useContext(PlayerContext);
  const { enemy, setEnemy } = useContext(EnemyContext);

  // This is used to for the targeting drop down
  const handleSelectChange = (event) => {
    const selectedIndex = parseInt(event.target.value, 10);
    setTargetEnemy(selectedIndex);
  };

  const showState = function () {
    console.log(player);
    console.log(enemy[targetEnemy]);
  };

  // Will change the turn between player and enemy, will only work for 2 entities.
  const changeTurn = function () {
    turn === 0 ? setTurn(1) : setTurn(0);
  };

  // Will check if any entities have 0 or less health, if there are the combat ends
  const checkIfCombatIsOver = function (attacker, defender) {
    if (attacker.stats.currentWounds < 1 || defender.stats.currentWounds < 1) {
      setbattleOver(true);
      return;
    }
    if (attacker.stats.currentWounds > 0 && !battleOver && turn !== 0) {
      const enemyTurn = enemyTurnTactic(player, enemy[targetEnemy]);
      turnManager(enemyTurn.chosenOptionIndex, 0, enemy[targetEnemy], player);
      return;
    }
  };

  // This is the function that is called when an attack button is clicked
  const handleWeaponsOnClick = function (weaponIndex) {
    turnManager(
      weaponIndex,
      1,
      player,
      enemy[targetEnemy],
      setPlayer,
      setEnemy
    ); // The 1 is the target
  };

  // This is the function that is called when a power button is clicked
  const handlePlayerPowersOnClick = function (powerIndex) {
    const statsAfterPower = usePlayerPower(
      powerIndex,
      player,
      enemy[targetEnemy]
    );
    if (statsAfterPower.targetID >= 0) {
      updateStats(statsAfterPower.targetID, statsAfterPower.updatedStats);
    }
  };

  // This is the function that is called when an item button is clicked
  const handleItemsOnClick = function (itemIndex) {
    const statsAfterItem = useItem(itemIndex, player, enemy[targetEnemy]);
    updateStats(statsAfterItem.targetID, statsAfterItem.updatedStats);
  };

  // Manages the turn cycle
  const turnManager = function (weaponIndex, targetID, attacker, defender) {
    const newStats = attackRoll(weaponIndex, attacker, defender);
    updateStats(targetID, newStats);
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

  const updateStats = function (targetID, newStats) {
    if (targetID === 0) {
      return setPlayer((prevPlayer) => ({ ...prevPlayer, ...newStats }));
    }
    updateEnemyStats(targetEnemy, newStats);
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
            {enemy.map((enemy, index) => (
              <option value={index} key={index}>
                {enemy.information.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>Player Health: {player.stats.currentWounds}</div>
      <div>Enemy Health: {enemy[targetEnemy].stats.currentWounds}</div>
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
                handlePowersOnClick={handlePlayerPowersOnClick}
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
