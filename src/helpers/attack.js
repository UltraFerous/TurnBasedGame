import {
  rollXDice,
  filterDicePoolAbove,
  filterDicePoolBelow,
  diceComparison,
} from "../helpers/diceRolls";

// Rolls the dice to hit, looking for results above or equal to the weapon skill
const hitRoll = function (index, user) {
  const weaponType = user.weapons[index].skill.type;
  console.log(user.statBonuses.skillBonuses[weaponType])

  const hitTargetNumber = diceComparison(
    user.stats.skill[weaponType] +
      user.statBonuses.skillBonuses[weaponType] +
      user.statModifiers.skillMod,
    user.weapons[index].skill.value
  );

  return filterDicePoolAbove(
    rollXDice(
      user.weapons[index].attacks +
        user.statBonuses.attacksBonus +
        user.statModifiers.attacksMod
    ),
    hitTargetNumber
  );
};

// Rolls the dice to wound, looking for results above or equal to the comparison result
const woundRoll = function (index, user, target, rolls) {
  const woundTargetNumber = diceComparison(
    user.stats.strength +
      user.statModifiers.strengthMod +
      user.weapons[index].weaponStrength,
    target.stats.toughness + target.statModifiers.toughnessMod
  );
  return filterDicePoolAbove(rollXDice(rolls), woundTargetNumber);
};

// Rolls the dice to save, looking for failed saves which are results less than the modified armour
const saveRoll = function (index, user, target, rolls) {
  const armourTargetNumber = diceComparison(
    target.save.armour +
      target.statModifiers.armourMod +
      target.statBonuses.armourBonus,
    user.weapons[index].rend
  );
  return filterDicePoolBelow(rollXDice(rolls), armourTargetNumber);
};

// Rolls the dice to save, looking for failed saves which are results less than the shield save armour
const shieldSaveRoll = function (index, user, target, rolls) {
  return filterDicePoolBelow(rollXDice(rolls), target.save.shield);
};

const damageRoll = function (index, rolls, user) {
  return rolls * user.weapons[index].damage;
};

const attackRoll = function (index, user, target) {
  let successfulRolls = 0;
  const attackLog = [
    `${user.information.name} declares an attack against ${target.information.name}.`,
  ];
  // Index is the select weapon
  attackLog.push(
    `${user.information.name} makes ${
      user.weapons[index].attacks +
      user.statBonuses.attacksBonus +
      user.statModifiers.attacksMod
    } attacks with ${user.weapons[index].name}.`
  );
  // Roll to hit, roll amount of attacks above or equal to skill
  const hitRollResults = hitRoll(index, user);
  successfulRolls = hitRollResults.length;
  attackLog.push(
    `${user.information.name} hits ${successfulRolls} attacks successfully.`
  );

  // Roll to wound, roll above comparison, unit strength + weapon vs target toughness
  const woundRollResults = woundRoll(index, user, target, successfulRolls);
  successfulRolls = woundRollResults.length;
  attackLog.push(
    `${user.information.name} wounds with ${successfulRolls} of those hits.`
  );

  //Target rolls to save, armour + rend, roll above or equal to target
  const saveRollResults = saveRoll(index, user, target, successfulRolls);

  successfulRolls = saveRollResults.length;
  attackLog.push(
    `${target.information.name} saves, ${successfulRolls} wounds are successful.`
  );

  //Reduce target wounds equal to the weapons damage
  const targetDamageResults =
    damageRoll(index, successfulRolls, user) +
    user.statBonuses.damageBonus +
    user.statModifiers.damageMod;
  attackLog.push(
    `${target.information.name} suffers ${targetDamageResults} damage.`
  );

  //Rolls for Shield Save after damage has been calculated. note most units do not have Shield saves, ie = 7
  const finalDamageResults = shieldSaveRoll(
    index,
    user,
    target,
    targetDamageResults
  ).length;

  targetDamageResults > 0 &&
    target.save.shield < 11 &&
    attackLog.push(
      `${target.information.name} attempts shield saves, ${target.information.name} suffers ${targetDamageResults} damage.`
    );

  //Returns the new health of the target
  const newCurrentWounds = target.stats.currentWounds - finalDamageResults;

  const updatedTargetStats = {
    ...target,
    stats: {
      ...target.stats,
      currentWounds: newCurrentWounds,
    },
  };

  attackLog.push(`${user.information.name}'s attack cycle ends.`);
  return { updatedTargetStats, attackLog };
};

export { attackRoll };
