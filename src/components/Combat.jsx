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
  const changeTurn = function (turn, setTurn) {
    turn === 0 ? setTurn(1) : setTurn(0);
  };

  // Will check if any entities have 0 or less health, if there are the combat ends
  const checkIfCombatIsOver = function (attacker, defender, setbattleOver) {
    if (attacker.stats.currentWounds < 1) {
      // Because the turn changes before the combat ends we need to do an immediate turn change
      changeTurn(turn, setTurn);
      setbattleOver(true);
      return;
    }
    if (defender.stats.currentWounds < 1) {
      setbattleOver(true);
      return;
    }
  };

  // Calculates the new entity stats after damage is applied
  // const calculateDamage = function (index, attacker, defender) {
  //   const updatedStats = {
  //     ...defender,
  //     stats: {
  //       ...defender.stats,
  //       currentWounds: attackRoll(index, attacker, defender),
  //     },
  //   };
  //   return updatedStats;
  // };

  //THESE FUNCTIONS ARE NOT SCABLE TO THE ENEMY
  // This is the function that is called when an attack button is clicked
  const handleWeaponsOnClick = function (index) {
    turnManager(index, player, enemy, setPlayer, setEnemy);
    turnManager(0, enemy, player, setEnemy, setPlayer);
  };

  const handlePowersOnClick = function (index) {
    const powerEffect = usePower(index, player, enemy);
    setEnemy(powerEffect);
    turnManager(0, enemy, player, setEnemy, setPlayer);
  };

  // Manages the turn cycle
  const turnManager = function (
    index,
    attacker,
    defender,
    setAttacker,
    setDefender
  ) {
    const newStats = attackRoll(index, attacker, defender);
    // setDefender(newStats.updatedTarget);
    updatePlayerAndEnemyStats(
      player,
      enemy,
      newStats.user,
      newStats.updatedTarget,
      setAttacker,
      setDefender
    );
  };

  // The asynchronous function to update both player and enemy states
  const updatePlayerAndEnemyStats = async function (
    player,
    enemy,
    newAttacker,
    newDefender,
    setAttacker,
    setDefender
  ) {
    try {
      // Update player state
      await setAttacker((player) => ({ ...player, ...newAttacker }));
      // Update enemy state
      await setDefender((enemy) => ({ ...enemy, ...newDefender }));
    } catch (error) {
      console.error("Error updating stats:", error);
    }
  };

  // Constantly checks if combat is over
  useEffect(() => {
    checkIfCombatIsOver(player, enemy, setbattleOver);
  }, [player, enemy]);

  return (
    <div>
      <div>It is turn: {turn === 0 ? "player" : "enemy"}.</div>
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
        <div>Battle Over {turn === 0 ? "Player Wins!" : "Enemy Wins!"}</div>
      )}
    </div>
  );
}

export default Combat;
