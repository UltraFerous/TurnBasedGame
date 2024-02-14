import { useContext, useState, useEffect } from "react";
import PlayerContext from "../context/playerContext";
import EnemyContext from "../context/enemyContext";
import { attackRoll } from "../helpers/attack";
import WeaponList from "./WeaponList";
import PowerList from "./PowerList";
import ItemList from "./ItemList.jsx";
import { usePower } from "../helpers/playerPowers.js";
import ConsoleLogDisplay from "./ConsoleLogDisplay.jsx";
import { useItem } from "../helpers/items.js";

// There is a bug where if the enemy defeats the player at the same time
// May be fixed with the initative system when I do that
function Combat() {
  const [turn, setTurn] = useState(0);
  const [battleOver, setbattleOver] = useState(false);
  const { player, setPlayer } = useContext(PlayerContext);
  const { enemy, setEnemy } = useContext(EnemyContext);

  // Will change the turn between player and enemy, will only work for 2 entities.
  const showState = function () {
    console.log(player);
    console.log(enemy);
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
      turnManager(0, 0, enemy, player);
      return;
    }
  };

  //THESE FUNCTIONS ARE NOT SCABLE TO THE ENEMY
  //     turnManager(0, 0, enemy, player);
  // This is the function that is called when an attack button is clicked
  const handleWeaponsOnClick = function (weaponIndex) {
    turnManager(weaponIndex, 1, player, enemy, setPlayer, setEnemy); // The 1 is the target
  };

  const handlePowersOnClick = function (powerIndex) {
    const statsAfterPower = usePower(powerIndex, player, enemy);
    if (statsAfterPower.targetID >= 0) {
      updateStats(statsAfterPower.targetID, statsAfterPower.updatedStats);
    }
  };

  const handleItemsOnClick = function (itemIndex) {
    const statsAfterItem = useItem(itemIndex, player, enemy);
    updateStats(statsAfterItem.targetID, statsAfterItem.updatedStats);
  };

  // Manages the turn cycle
  const turnManager = function (weaponIndex, targetID, attacker, defender) {
    const newStats = attackRoll(weaponIndex, attacker, defender);
    updateStats(targetID, newStats);
  };

  const updateStats = function (targetID, newStats) {
    if (targetID === 0) {
      return setPlayer((prevPlayer) => ({ ...prevPlayer, ...newStats }));
    }
    setEnemy((prevEnemy) => ({ ...prevEnemy, ...newStats }));
    return;
  };

  // Constantly checks if combat is over
  useEffect(() => {
    changeTurn();
    checkIfCombatIsOver(player, enemy);
  }, [player, enemy]);

  return (
    <div>
      <button onClick={() => showState()}>SHOW STATE</button>
      <div>Player Health: {player.stats.currentWounds}</div>
      <div>Enemy Health: {enemy.stats.currentWounds}</div>
      {battleOver === false ? (
        <div>
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
          <div>
            <strong>Powers:</strong>
            {player.powers.map((power, index) => (
              <PowerList
                key={power.id}
                id={power.id}
                name={power.name}
                handlePowersOnClick={handlePowersOnClick}
              />
            ))}
          </div>
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
