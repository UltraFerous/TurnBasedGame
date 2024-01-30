import { useContext, useState, useEffect } from "react";
import PlayerContext from "../context/playerContext";
import EnemyContext from "../context/enemyContext";
import { attackRoll } from "../helpers/attack";

function Combat() {
  const [turn, setTurn] = useState(0);
  const [battleOver, setbattleOver] = useState(false);
  const { player, setPlayer } = useContext(PlayerContext);
  const { enemy, setEnemy } = useContext(EnemyContext);

  const checkIfCombatIsOver = async function (attacker, defender, setbattleOver) {
    if (attacker.stats.currentWounds < 1 || defender.stats.currentWounds < 1) {
      return setbattleOver(true);
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

  const turnManager = async function (
    attacker,
    defender,
    setAttacker,
    setDefender
  ) {
    try {
      const damageDone = calculateDamage(attacker, defender);
      await setDefender(damageDone);
      if (!battleOver) {
        turn === 0 ? setTurn(1) : setTurn(0);
      }
    } catch {
      console.error("Error in turnManager:", error);
    }
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
        // Because the turn changes before the combat ends we check if turn is equal to 1
        <div>Battle Over {turn === 1 ? "Player Wins!" : "Enemy Wins!"}</div>
      )}
    </div>
  );
}

export default Combat;
