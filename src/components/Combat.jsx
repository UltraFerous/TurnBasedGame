import { useContext, useState, useEffect } from "react";
import PlayerContext from "../context/playerContext";
import EnemyContext from "../context/enemyContext";
import { attackRoll } from "../helpers/attack";
import WeaponList from "./WeaponList";
import ConsoleLogDisplay from "./ConsoleLogDisplay.jsx";

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
  const calculateDamage = function(index, attacker, defender) {
    const updatedStats = {
      ...defender,
      stats: {
        ...defender.stats,
        currentWounds: attackRoll(index, attacker, defender),
      },
    };
    return updatedStats;
  };

  const handleWeaponsOnClick = function (index) {
    turnManager(index, player, enemy, setPlayer, setEnemy);
    turnManager(0, enemy, player, setEnemy, setPlayer);
  };

  // Manages the turn cycle
  const turnManager = function (index, attacker, defender, setAttacker, setDefender) {
    const damageDone = calculateDamage(index, attacker, defender);
    setDefender(damageDone);
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
        player.weapons.map((item, index) => (
          <WeaponList
            key={player.weapons[index].id}
            id={player.weapons[index].id}
            name={player.weapons[index].name}
            handleWeaponsOnClick={handleWeaponsOnClick}
          />
        ))
      ) : (
        <div>Battle Over {turn === 0 ? "Player Wins!" : "Enemy Wins!"}</div>
      )}
    </div>
  );
}

export default Combat;
