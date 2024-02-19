import { rollXDiceD3, roll2D6Dice } from "./diceRolls";
import { attackRoll } from "./attack";

// I have changed the setting of this game and thus the power names. It is too much to change right now, so some of the names are from the old setting.
// This stuff needs to be refactored

const justDoDamage = function (user, target, targetIndex) {
  const updatedStats = {
    ...target,
    stats: {
      ...target.stats,
      currentWounds: target.stats.currentWounds - 3,
    },
  };
  console.log(user.information.name, " does 3 damage.");
  return { combatTeam: 1, updatedStats, targetID: targetIndex };
};

const justHealSelf = function (user, target, targetIndex) {
  const updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      currentWounds: user.stats.currentWounds + 3,
    },
  };
  console.log(user.information.name, " heals 3 damage.");
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
  callbackPower,
  activationValue
) {
  const totalCastBonus = user.statModifiers.castBonusMod + user.stats.castBonus;
  const activationRoll = roll2D6Dice() + totalCastBonus;
  if (activationRoll <= 2) {
    console.log("Oh No! Misactivation!");
    return { combatTeam: 1, updatedStats: user, targetID: enemyIndex };
  } else if (activationRoll < activationValue) {
    console.log("The power was not activated!");
    return { combatTeam: 1, updatedStats: user, targetID: enemyIndex };
  }
  return callbackPower(user, enemy, enemyIndex);
};

const useEnemyPower = function (power, user, enemy, targetIndex) {
  switch (power) {
    case 0:
      return activatePower(user, enemy, targetIndex, justHealSelf, 2);
    default:
      console.log(`Sorry power just didn't work.`);
  }
};

export { useEnemyPower };
