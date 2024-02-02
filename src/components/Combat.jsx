import { useContext, useState, useEffect } from "react";
import PlayerContext from "../context/playerContext";
import EnemyContext from "../context/enemyContext";
import { attackRoll } from "../helpers/attack";
import WeaponList from "./WeaponList";
import PowerList from "./PowerList";
import { usePower } from "../helpers/powers.js";
import ConsoleLogDisplay from "./ConsoleLogDisplay.jsx";

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
  const checkIfCombatIsOver = function (attacker, defender, setbattleOver) {
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
  const handleWeaponsOnClick = function (index) {
    turnManager(index, 1, player, enemy, setPlayer, setEnemy);
  };

  const handlePowersOnClick = function (index) {
    const statsAfterPower = usePower(index, player, enemy);
    updateStats(statsAfterPower.targetID, statsAfterPower.updatedStats);
  };

  // Manages the turn cycle
  const turnManager = function (attackIndex, targetID, attacker, defender) {
    const newStats = attackRoll(attackIndex, attacker, defender);
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
    checkIfCombatIsOver(player, enemy, setbattleOver);
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
        </div>
      ) : (
        <div>Battle Over!</div>
      )}
    </div>
  );
}

export default Combat;
