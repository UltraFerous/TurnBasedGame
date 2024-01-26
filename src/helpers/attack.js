import {
  rollXDice,
  filterDicePoolAbove,
  filterDicePoolBelow,
  woundComparison,
} from "../helpers/diceRolls";

const attackRoll = function (user, target) {
  let seccesses = 0;

  // Roll to hit, roll amount of attacks above or equal to skill
  const hitRoll = filterDicePoolAbove(
    rollXDice(user.weapons[0].attacks),
    user.weapons[0].skill
  );
  seccesses = hitRoll.length;

  // Roll to wound, roll above comparison, unit strength + weapon vs target toughness
  const woundTargetNumber = woundComparison(
    user.stats.strength + user.weapons[0].strengthBonus,
    target.stats.toughness
  );
  const woundRoll = filterDicePoolAbove(
    rollXDice(seccesses),
    woundTargetNumber
  );
  seccesses = woundRoll.length;

  //Target rolls to save, armour + rend, roll above or equal to target
  const saveRoll = filterDicePoolBelow(
    rollXDice(seccesses),
    target.save.armour + user.weapons[0].rend
  );
  seccesses = saveRoll.length;

  //Reduce target wounds equal to the weapons damage
  const targetDamage = seccesses * user.weapons[0].damage;

  return (target.stats.currentWounds - targetDamage);
};

export { attackRoll };
