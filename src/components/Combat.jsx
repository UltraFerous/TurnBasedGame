import { useContext, useState } from "react";
import {
  rollXDice,
  filterDicePoolAbove,
  filterDicePoolBelow,
  woundComparison,
} from "../helpers/diceRolls";
import PlayerContext from "../context/playerContext";
import EnemyContext from "../context/enemyContext";

function Combat() {
  const [turn, setTurn] = useState(0);
  const {player, setPlayer}  = useContext(PlayerContext);
  const {enemy, setEnemy}  = useContext(EnemyContext);

  const playerTurnManager = function () {
    let seccesses = 0;
    // Roll to hit, roll amount of attacks above or equal to skill
    const hitRoll = filterDicePoolAbove(
      rollXDice(player.weapons[0].attacks),
      player.weapons[0].skill
    );
    seccesses = hitRoll.length;

    // Roll to wound, roll above comparison, unit strength + weapon vs target toughness
    const woundTargetNumber = woundComparison(
      player.stats.strength + player.weapons[0].strengthBonus,
      enemy.stats.toughness
    );
    const woundRoll = filterDicePoolAbove(
      rollXDice(seccesses),
      woundTargetNumber
    );
    seccesses = woundRoll.length;

    //Target rolls to save, armour + rend, roll above or equal to target
    const saveRoll = filterDicePoolBelow(
      rollXDice(seccesses),
      enemy.save.armour + player.weapons[0].rend
    );
    seccesses = saveRoll.length;

    //Reduce target wounds equal to the weapons damage
    const targetDamage = seccesses * player.weapons[0].damage;
    setEnemy({
      ...enemy,
      stats: {
        ...enemy.stats,
        currentWounds: enemy.stats.currentWounds - targetDamage,
      },
    });
    
    // setTurn(1);
    return
  };

  return (
    <div>
      <div>It is turn: {turn === 0 ? "player" : "enemy"}.</div>
      <div>Player Health: {player.stats.currentWounds}</div>
      <div>Enemy Health: {enemy.stats.currentWounds}</div>
      <button
        type="submit"
        onClick={turn === 0 ? playerTurnManager : turnManager}
      >
        Change Turn
      </button>
    </div>
  );
}

export default Combat;
