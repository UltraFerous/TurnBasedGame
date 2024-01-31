import { rollXDiceD3 } from "./diceRolls";

const usePower = function (power, user, target) {
  switch (power) {
    case 1:
      console.log("Oranges are $0.59 a pound.");
      break;

    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }
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
      currentWounds: user.stats.castBonus + healAmount,
    },
  };
  return updatedStats;
};
