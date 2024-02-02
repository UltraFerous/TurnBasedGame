import {
  rollXDice,
  filterDicePoolAbove,
  filterDicePoolBelow,
  woundComparison,
} from "../helpers/diceRolls";

// Rolls the dice to hit, looking for results above or equal to the weapon skill
const hitRoll = function (index, user) {
  return filterDicePoolAbove(
    rollXDice(user.weapons[index].attacks),
    user.weapons[index].skill + user.statModifiers.skillMod
  );
};

// Rolls the dice to wound, looking for results above or equal to the comparison result
const woundRoll = function (index, user, target, rolls) {
  const woundTargetNumber = woundComparison(
    user.stats.strength +
      user.statModifiers.strengthMod +
      user.weapons[index].strengthBonus,
    target.stats.toughness + target.statModifiers.toughnessMod
  );
  return filterDicePoolAbove(rollXDice(rolls), woundTargetNumber);
};

// Rolls the dice to save, looking for failed saves which are results less than the modified armour
const saveRoll = function (index, user, target, rolls) {
  return filterDicePoolBelow(
    rollXDice(rolls),
    target.save.armour + user.weapons[index].rend
  );
};

const damageRoll = function (index, rolls, user) {
  return rolls * user.weapons[index].damage;
};

const attackRoll = function (index, user, target, id) {
  let successfulRolls = 0;

  // Roll to hit, roll amount of attacks above or equal to skill
  const hitRollResults = hitRoll(index, user);
  successfulRolls = hitRollResults.length;

  // Roll to wound, roll above comparison, unit strength + weapon vs target toughness
  const woundRollResults = woundRoll(index, user, target, successfulRolls);
  successfulRolls = woundRollResults.length;

  //Target rolls to save, armour + rend, roll above or equal to target
  const saveRollResults = saveRoll(index, user, target, successfulRolls);
  successfulRolls = saveRollResults.length;

  //Reduce target wounds equal to the weapons damage
  const targetDamageResults = damageRoll(index, successfulRolls, user);
  console.log(user.information.name, " does ", targetDamageResults, " damage.");

  //Returns the new health of the target
  const newCurrentWounds = target.stats.currentWounds - targetDamageResults;

  const updatedTargetStats = {
    ...target,
    stats: {
      ...target.stats,
      currentWounds: newCurrentWounds,
    },
  };

  return updatedTargetStats;
};

export { attackRoll };
