import { useContext, useState, useEffect } from "react";
import PlayerContext from "../context/playerContext";
import EnemyContext from "../context/enemyContext";
import { attackRoll } from "../helpers/attack";

function Combat() {
  const [turn, setTurn] = useState(0);
  const [battleOver, setbattleOver] = useState(false);
  const { player, setPlayer } = useContext(PlayerContext);
  const { enemy, setEnemy } = useContext(EnemyContext);

  const changeTurn = function(turn, setTurn) {
    turn === 0 ? setTurn(1) : setTurn(0);
  };

  const checkIfCombatIsOver = function (attacker, defender, setbattleOver) {
    if (attacker.stats.currentWounds < 1 || defender.stats.currentWounds < 1) {
      // Because the turn changes before the combat ends we need to do an immediate turn change
      changeTurn(turn, setTurn)
      setbattleOver(true);
    }
  };

  const calculateDamage = function (attacker, defender) {
    const updatedStats = {
      ...defender,
      stats: {
        ...defender.stats,
        currentWounds: attackRoll(attacker, defender),
      },
    };
    return updatedStats;
  };

  const turnManager = function (attacker, defender, setAttacker, setDefender) {
    const damageDone = calculateDamage(attacker, defender);
    setDefender(damageDone);
    changeTurn(turn, setTurn)
  };

  useEffect(() => {
    checkIfCombatIsOver(player, enemy, setbattleOver);
  }, [player, enemy]);

  return (
    <div>
      <div>It is turn: {turn === 0 ? "player" : "enemy"}.</div>
      <div>Player Health: {player.stats.currentWounds}</div>
      <div>Enemy Health: {enemy.stats.currentWounds}</div>
      {battleOver === false ? (
        <button
          type="submit"
          onClick={() => {
            turn === 0
              ? turnManager(player, enemy, setPlayer, setEnemy)
              : turnManager(enemy, player, setEnemy, setPlayer);
          }}
        >
          Change Turn
        </button>
      ) : (
        <div>Battle Over {turn === 0 ? "Player Wins!" : "Enemy Wins!"}</div>
      )}
    </div>
  );
}

export default Combat;
