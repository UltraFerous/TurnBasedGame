import { rollXDice, diceComparison } from "./diceRolls";
import { attackRoll } from "./attack";

// I have changed the setting of this game and thus the power names. It is too much to change right now, so some of the names are from the old setting.
// This stuff needs to be refactored

const justDoDamage = function (
  user,
  target,
  enemyIndex,
  powerData,
  playerPowerLog
) {
  const damageAmount = powerData.damage;
  const updatedStats = {
    ...target,
    stats: {
      ...target.stats,
      currentWounds: target.stats.currentWounds - damageAmount,
    },
  };
  playerPowerLog.push(
    `${user.information.name}'s power deals ${damageAmount} to ${target.information.name}.`,
    `${user.information.name}'s power cycle ends.`
  );
  return { combatTeam: 1, updatedStats, targetID: enemyIndex, playerPowerLog };
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

const statIncrease = function (
  user,
  enemy,
  enemyIndex,
  powerData,
  playerPowerLog
) {
  const updatedStats = { ...user };
  if (updatedStats.statModifiers.hasOwnProperty(powerData.stat)) {
    updatedStats.statModifiers[powerData.stat] += powerData.amount;
  } else {
    console.error(
      `Stat ${itemInformation.stat} not found in userStats object.`
    );
  }
  playerPowerLog.push(
    `${user.information.name} increases their ${powerData.stat} by ${powerData.amount}.`,
    `${user.information.name}'s power cycle ends.`
  );
  console.log(updatedStats);
  return { combatTeam: 0, updatedStats, targetID: 0, playerPowerLog };
};

const activatePower = function (
  user,
  enemy,
  enemyIndex,
  powerData,
  powerCallback
) {
  const activationValue = powerData.activationValue;
  const playerPowerLog = [
    `${user.information.name} attempts to activate power ${powerData.name}.`,
  ];
  const totalPowerBonus =
    user.statModifiers.powerActivationMod + user.stats.power;
  const activationRoll = rollXDice(1)[0] + totalPowerBonus;

  if (activationRoll <= 1) {
    playerPowerLog.push(
      `Oh No! A ${activationRoll}, the power critically failured.`,
      `${user.information.name}'s power cycle ends.`
    );
    return { targetID: -1, combatTeam: 0, playerPowerLog };
  } else if (activationRoll < activationValue) {
    playerPowerLog.push(
      `A ${activationRoll}, the power was not activated.`,
      `${user.information.name}'s power cycle ends.`
    );
    return { targetID: -1, combatTeam: 0, playerPowerLog };
  }

  playerPowerLog.push(
    `A ${activationRoll}, the power was successfully activated.`
  );
  return powerCallback(user, enemy, enemyIndex, powerData, playerPowerLog);
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
