import { rollXDiceD3, roll2D6Dice } from "./diceRolls";
import { attackRoll } from "./attack";

// I have changed the setting of this game and thus the power names. It is too much to change right now, so some of the names are from the old setting.
// This stuff needs to be refactored

const justDoDamage = function (user, target, enemyIndex, powerData) {
  const damageAmount = powerData.damage;
  const updatedStats = {
    ...target,
    stats: {
      ...target.stats,
      currentWounds: target.stats.currentWounds - damageAmount,
    },
  };
  return { combatTeam: 1, updatedStats, targetID: enemyIndex };
};

const justDoDamageSelf = function (user, target, enemyIndex) {
  const updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      currentWounds: user.stats.currentWounds - 3,
    },
  };
  console.log(user.information.name, " does 3 damage self.");
  return { combatTeam: 0, updatedStats, targetID: 0 };
};

const testAttackSpell = function (user, target) {
  const powerAttackForUser = {
    information: { ...user.information },
    stats: { ...user.stats },
    statModifiers: { ...user.statModifiers },
    weapons: [
      {
        id: 0,
        name: "Spell Attack One",
        skill: 2,
        strengthBonus: 10,
        rend: 10,
        damage: 10,
        attacks: 4,
      },
    ],
  };
  const updatedStats = attackRoll(0, powerAttackForUser, target);
  return { updatedStats, targetID: 1 };
};

const statIncrease = function (user, enemy, enemyIndex, powerData) {
  const updatedStats = { ...user };
  if (updatedStats.statModifiers.hasOwnProperty(powerData.stat)) {
    updatedStats.statModifiers[powerData.stat] += powerData.amount;
  } else {
    console.error(
      `Stat ${itemInformation.stat} not found in userStats object.`
    );
  }
  console.log(updatedStats);
  return { combatTeam: 0, updatedStats, targetID: 0 };
};

const activatePower = function (
  user,
  enemy,
  enemyIndex,
  powerData,
  powerCallback
) {
  const activationValue = powerData.activationValue;
  const totalPowerBonus =
    user.statModifiers.powerActivationMod + user.stats.power;
  const activationRoll = roll2D6Dice() + totalPowerBonus;
  if (activationRoll <= 2) {
    console.log("Oh No! Misactivation!");
    return { targetID: -1 };
  } else if (activationRoll < activationValue) {
    console.log("The power was not activated!");
    return { targetID: -1 };
  }
  return powerCallback(user, enemy, enemyIndex, powerData);
};

const usePlayerPower = function (powerData, user, enemy, enemyIndex) {
  if (powerData.type === 2) {
    return activatePower(user, enemy, enemyIndex, powerData, statIncrease);
  }
  if (powerData.type === 3) {
    return activatePower(user, enemy, enemyIndex, powerData, justDoDamage);
  }
};

export { usePlayerPower };
