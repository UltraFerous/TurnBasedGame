import {
  rollXDice,
  filterDicePoolAbove,
  filterDicePoolBelow,
  woundComparison,
} from "../helpers/diceRolls";

const hitRoll = function (user) {
  return filterDicePoolAbove(
    rollXDice(user.weapons[0].attacks),
    user.weapons[0].skill
  );
};

const woundRoll = function (user, target, rolls) {
  const woundTargetNumber = woundComparison(
    user.stats.strength + user.weapons[0].strengthBonus,
    target.stats.toughness
  );
  return filterDicePoolAbove(rollXDice(rolls), woundTargetNumber);
};

const saveRoll = function (user, target, rolls) {
  return filterDicePoolBelow(
    rollXDice(rolls),
    target.save.armour + user.weapons[0].rend
  );
};

const damageRoll = function (rolls, user) {
  return rolls * user.weapons[0].damage;
};

const attackRoll = function (user, target) {
  let successfulRolls = 0;

  // Roll to hit, roll amount of attacks above or equal to skill
  const hitRollResults = hitRoll(user)
  successfulRolls = hitRollResults.length;
  console.log("Hit roll", successfulRolls);

  // Roll to wound, roll above comparison, unit strength + weapon vs target toughness
  const woundRollResults = woundRoll(user, target, successfulRolls)
  successfulRolls = woundRollResults.length;
  console.log("Wound roll", successfulRolls);

  //Target rolls to save, armour + rend, roll above or equal to target
  const saveRollResults = saveRoll(user, target, successfulRolls)
  successfulRolls = saveRollResults.length;
  console.log("Save roll", successfulRolls);

  //Reduce target wounds equal to the weapons damage
  const targetDamageResults = damageRoll(successfulRolls, user)
  console.log("Damage roll", targetDamageResults);

  return target.stats.currentWounds - targetDamageResults;
};

export { attackRoll };
