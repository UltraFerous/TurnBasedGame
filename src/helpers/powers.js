import { rollXDiceD3 } from "./diceRolls";
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

const applyPowerAttackBuff = function (power, user, target) {
  const updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      strength: user.stats.strength + 1,
    },
  };
  return updatedStats;
};

const applyPowerHitCastBonus = function (power, user, target) {
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

const applyPowerWeakenEnemyArmour = function (power, user, target) {
  const updatedStats = {
    ...target,
    save: {
      ...target.save,
      armour: target.save.armour + 1,
    },
  };
  return updatedStats;
};

const applyPowerHealWounds = function (power, user, target) {
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

const usePower = function (power, user, target) {
  switch (power) {
    case 0:
      return justDoDamage(user, target);
    case 1:
      return justDoDamageSelf(user, target);
    case 2:
      return testAttackSpell(user, target);
    default:
      console.log(`Sorry.`);
  }
};

export { usePower };
