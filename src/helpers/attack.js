import {
  rollXDice,
  filterDicePoolAbove,
  filterDicePoolBelow,
  woundComparison,
} from "../helpers/diceRolls";

// Rolls the dice to hit, looking for results above or equal to the weapon skill
const hitRoll = function (user) {
  return filterDicePoolAbove(
    rollXDice(user.weapons[0].attacks),
    user.weapons[0].skill
  );
};

// Rolls the dice to wound, looking for results above or equal to the comparison result
const woundRoll = function (user, target, rolls) {
  const woundTargetNumber = woundComparison(
    user.stats.strength + user.weapons[0].strengthBonus,
    target.stats.toughness
  );
  return filterDicePoolAbove(rollXDice(rolls), woundTargetNumber);
};

// Rolls the dice to save, looking for failed saves which are results less than the modified armour
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
  const hitRollResults = hitRoll(user);
  successfulRolls = hitRollResults.length;

  // Roll to wound, roll above comparison, unit strength + weapon vs target toughness
  const woundRollResults = woundRoll(user, target, successfulRolls);
  successfulRolls = woundRollResults.length;

  //Target rolls to save, armour + rend, roll above or equal to target
  const saveRollResults = saveRoll(user, target, successfulRolls);
  successfulRolls = saveRollResults.length;

  //Reduce target wounds equal to the weapons damage
  const targetDamageResults = damageRoll(successfulRolls, user);
  console.log(user.information.name, " does ", targetDamageResults, " damage.");

  //Returns the new health of the target
  const newCurrentWounds = target.stats.currentWounds - targetDamageResults;
  return newCurrentWounds;
};

export { attackRoll };
