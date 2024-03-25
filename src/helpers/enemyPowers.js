import { rollXDice } from "./diceRolls";
import { attackRoll } from "./attack";

// I have changed the setting of this game and thus the power names. It is too much to change right now, so some of the names are from the old setting.
// This stuff needs to be refactored

const justDoDamage = function (
  user,
  target,
  targetIndex,
  powerData,
  enemyPowerLog
) {
  const damageAmount = powerData.damage;
  const updatedStats = {
    ...target,
    stats: {
      ...target.stats,
      currentWounds: target.stats.currentWounds - damageAmount,
    },
  };
  enemyPowerLog.push(
    `${user.information.name} deals ${damageAmount} to ${target.information.name}.`,
    `${user.information.name}'s power cycle ends.`
  );
  return { combatTeam: 0, updatedStats, targetID: 0, enemyPowerLog };
};

const justHealSelf = function (user, target, targetIndex) {
  const updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      currentWounds: user.stats.currentWounds + 3,
    },
  };
  return { combatTeam: 1, updatedStats, targetID: targetIndex };
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

const activatePower = function (
  user,
  enemy,
  enemyIndex,
  powerData,
  powerCallback
) {
  const activationValue = powerData.activationValue;
  const enemyPowerLog = [
    `${user.information.name} attempts to activate power ${powerData.name}.`,
  ];
  const totalPowerBonus = user.statModifiers.powerMod + user.stats.power;

  const activationRoll = rollXDice(1)[0] + totalPowerBonus;
  if (activationRoll <= 1) {
    enemyPowerLog.push(
      `Oh No! A ${activationRoll}, the power critically failured.`,
      `${user.information.name}'s power cycle ends.`
    );
    return {
      combatTeam: 1,
      updatedStats: user,
      targetID: enemyIndex,
      enemyPowerLog,
    };
  } else if (activationRoll < activationValue) {
    enemyPowerLog.push(
      `A ${activationRoll}, the power was not activated.`,
      `${user.information.name}'s power cycle ends.`
    );
    return {
      combatTeam: 1,
      updatedStats: user,
      targetID: enemyIndex,
      enemyPowerLog,
    };
  }
  enemyPowerLog.push(
    `A ${activationRoll}, the power was successfully activated.`
  );
  return powerCallback(user, enemy, enemyIndex, powerData, enemyPowerLog);
};

const useEnemyPower = function (powerData, user, enemy, enemyIndex) {
  if (powerData.type === 3) {
    return activatePower(user, enemy, enemyIndex, powerData, justDoDamage);
  }
};

export { useEnemyPower };
