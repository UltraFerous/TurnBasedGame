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

// Doctrine of Ignis
const applyStrengthAttackBuff = function (user, target) {
  const updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      strength: user.stats.strength + 1,
    },
  };
  return { updatedStats, targetID: 0 };
};

const ignisDamagePower = function (user, target) {
  const powerAttackForUser = {
    information: { ...user.information },
    stats: { ...user.stats },
    statModifiers: { ...user.statModifiers },
    weapons: [
      {
        id: 0,
        name: "Spell Attack One",
        skill: 2,
        attacks: 6,
        strengthBonus: -2,
        rend: 1,
        damage: 2,
      },
    ],
  };
  const updatedStats = attackRoll(0, powerAttackForUser, target);
  return { updatedStats, targetID: 1 };
};

// Doctrine of Lux
const applyPowerHitCastBonus = function (user, target) {
  const updatedStats = {
    ...user,
    statModifiers: {
      ...statModifiers,
      castBonusMod: user.statModifiers.castBonusMod + 1,
      skillMod: user.statModifiers.skillMod + 1,
    },
  };
  return { updatedStats, targetID: 0 };
};

const luxDamagePower = function (user, target) {
  const powerAttackForUser = {
    information: { ...user.information },
    stats: { ...user.stats },
    statModifiers: { ...user.statModifiers },
    weapons: [
      {
        id: 0,
        name: "Spell Attack One",
        skill: 6,
        attacks: 2,
        strengthBonus: 4,
        rend: 3,
        damage: 4,
      },
    ],
  };
  const updatedStats = attackRoll(0, powerAttackForUser, target);
  return { updatedStats, targetID: 1 };
};

// Doctrine of Ferrum
const applyPowerWeakenEnemyArmour = function (user, target) {
  const updatedStats = {
    ...user,
    statModifiers: {
      ...statModifiers,
      // This should be +1 since armour is rolled under
      armourMod: user.statModifiers.armourMod + 1,
    },
  };
  return { updatedStats, targetID: 0 };
};

const ferrumDamagePower = function (user, target) {
  const powerAttackForUser = {
    information: { ...user.information },
    stats: { ...user.stats },
    statModifiers: { ...user.statModifiers },
    weapons: [
      {
        id: 0,
        name: "Spell Attack One",
        skill: 3,
        attacks: 4,
        strengthBonus: 0,
        rend: 0,
        damage: 2,
      },
    ],
  };
  const updatedStats = attackRoll(0, powerAttackForUser, target);
  return { updatedStats, targetID: 1 };
};

// Doctrine of Vita
const applyPowerHealWounds = function (user, target) {
  const healAmount = rollXDiceD3(1)[0] + 1;
  const updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      currentWounds: user.stats.currentWounds + healAmount,
    },
  };
  return { updatedStats, targetID: 0 };
};

const vitaDamagePower = function (user, target) {
  const powerAttackForUser = {
    information: { ...user.information },
    stats: { ...user.stats },
    statModifiers: { ...user.statModifiers },
    weapons: [
      {
        id: 0,
        name: "Spell Attack One",
        skill: 3,
        attacks: 4,
        strengthBonus: 0,
        rend: 3,
        damage: 1,
      },
    ],
  };
  const updatedStats = attackRoll(0, powerAttackForUser, target);
  return { updatedStats, targetID: 1 };
};

// Doctrine of Umbra
const applyPowerReduceHit = function (user, target) {
  const updatedStats = {
    ...target,
    statModifiers: {
      ...statModifiers,
      skillMod: target.statModifiers.skillMod - 1,
    },
  };
  return { updatedStats, targetID: 1 };
};

const umbraDamagePower = function (user, target) {
  const powerAttackForUser = {
    information: { ...user.information },
    stats: { ...user.stats },
    statModifiers: { ...user.statModifiers },
    weapons: [
      {
        id: 0,
        name: "Spell Attack One",
        skill: 2,
        attacks: 1,
        strengthBonus: -2,
        rend: 3,
        damage: 6,
      },
    ],
  };
  const updatedStats = attackRoll(0, powerAttackForUser, target);
  return { updatedStats, targetID: 1 };
};

// Doctrine of Bestiarum
const applyToughness = function (user, target) {
  const updatedStats = {
    ...user,
    statModifiers: {
      ...statModifiers,
      skillMod: user.statModifiers.toughnessMod + 1,
    },
  };
  return { updatedStats, targetID: 0 };
};

const bestiarumDamagePower = function (user, target) {
  const powerAttackForUser = {
    information: { ...user.information },
    stats: { ...user.stats },
    statModifiers: { ...user.statModifiers },
    weapons: [
      {
        id: 0,
        name: "Spell Attack One",
        skill: 4,
        attacks: 10,
        strengthBonus: 1,
        rend: 2,
        damage: 1,
      },
    ],
  };
  const updatedStats = attackRoll(0, powerAttackForUser, target);
  return { updatedStats, targetID: 1 };
};

// Doctrine of Mortis
const applyArmour = function (user, target) {
  const updatedStats = {
    ...user,
    statModifiers: {
      ...statModifiers,
      skillMod: user.statModifiers.armourMod + 1,
    },
  };
  return { updatedStats, targetID: 0 };
};

const mortisDamagePower = function (user, target) {
  const damageAmount = rollXDiceD3(1)[0];
  const updatedStats = {
    ...target,
    stats: {
      ...target.stats,
      currentWounds: target.stats.currentWounds - damageAmount,
    },
  };
  return { updatedStats, targetID: 1 };
};

// Doctrine of Coeli
const applyDamageBuff = function (user, target) {
  const updatedStats = {
    ...user,
    statModifiers: {
      ...statModifiers,
      skillMod: user.statModifiers.damageMod + 1,
    },
  };
  return { updatedStats, targetID: 0 };
};

const coeliDamagePower = function (user, target) {
  const powerAttackForUser = {
    information: { ...user.information },
    stats: { ...user.stats },
    statModifiers: { ...user.statModifiers },
    weapons: [
      {
        id: 0,
        name: "Spell Attack One",
        skill: 3,
        attacks: 3,
        strengthBonus: 1,
        rend: 2,
        damage: 0,
      },
    ],
  };
  const updatedStats = attackRoll(0, powerAttackForUser, target);
  return { updatedStats, targetID: 1 };
};

const activatePower = function (user, enemy, callbackPower, activationValue) {
  const activationRoll = roll2D6Dice();
  if (activationRoll <= 2) {
    console.log("Oh No! Misactivation!");
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
