import { rollXDiceD3, roll2D6Dice } from "./diceRolls";
import { attackRoll } from "../helpers/attack";

const justDoDamage = function (user, target) {
  const updatedStats = {
    ...target,
    stats: {
      ...target.stats,
      currentWounds: target.stats.currentWounds - 3,
    },
  };
  console.log(user.information.name, " does 3 damage.");
  return { updatedStats, targetID: 1 };
};

const justDoDamageSelf = function (user, target) {
  const updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      currentWounds: user.stats.currentWounds - 3,
    },
  };
  console.log(user.information.name, " does 3 damage self.");
  return { updatedStats, targetID: 0 };
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

const applyPowerAttackBuff = function (user, target) {
  const updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      strength: user.stats.strength + 1,
    },
  };
  return updatedStats;
};

const applyPowerHitCastBonus = function (user, target) {
  const updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      castBonus: user.stats.castBonus + 1,
      hitBonus: user.stats.hitBonus + 1,
    },
  };
  return updatedStats;
};

const applyPowerWeakenEnemyArmour = function (user, target) {
  const updatedStats = {
    ...target,
    save: {
      ...target.save,
      armour: target.save.armour + 1,
    },
  };
  return updatedStats;
};

const applyPowerHealWounds = function (user, target) {
  const healAmount = rollXDiceD3(1)[0];
  const updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      currentWounds: user.stats.currentWounds + healAmount,
    },
  };
  return updatedStats;
};

const activatePower = function (user, enemy, callbackPower, activationValue) {
  const activationRoll = roll2D6Dice();
  if (activationRoll <= 2) {
    console.log("The power miscasted!");
    return { targetID: -1 };
  } else if (activationRoll < activationValue) {
    console.log("The power was not activated!");
    return { targetID: -1 };
  }
  return callbackPower(user, enemy);
};

const usePower = function (power, user, enemy) {
  switch (power) {
    case 0:
      return activatePower(user, enemy, justDoDamage, 5);
    case 1:
      return activatePower(user, enemy, justDoDamageSelf, 5);
    case 2:
      return activatePower(user, enemy, testAttackSpell, 5);
    default:
      console.log(`Sorry power just didn't work.`);
  }
};

export { usePower };
