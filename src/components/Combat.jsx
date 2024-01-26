import { useContext, useState } from "react";
import PlayerContext from "../context/playerContext";
import EnemyContext from "../context/enemyContext";
import { attackRoll } from "../helpers/attack";

function Combat() {
  const [turn, setTurn] = useState(0);
  const { player, setPlayer } = useContext(PlayerContext);
  const { enemy, setEnemy } = useContext(EnemyContext);

  const playerTurnManager = function () {
    const updatedEnemy = {
      ...enemy,
      stats: {
        ...enemy.stats,
        currentWounds: attackRoll(player, enemy),
      },
    };
    setEnemy(updatedEnemy)
    setTurn(1);
  };

  const enemyTurnManager = function () {
    const updatedPlayer = {
      ...player,
      stats: {
        ...player.stats,
        currentWounds: attackRoll(enemy, player),
      },
    };
    setPlayer(updatedPlayer);
    setTurn(0);
  };

  return (
    <div>
      <div>It is turn: {turn === 0 ? "player" : "enemy"}.</div>
      <div>Player Health: {player.stats.currentWounds}</div>
      <div>Enemy Health: {enemy.stats.currentWounds}</div>
      <button
        type="submit"
        onClick={turn === 0 ? playerTurnManager : enemyTurnManager}
      >
        Change Turn
      </button>
    </div>
  );
}

export default Combat;
