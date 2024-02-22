import { rollXDiceD3, roll2D6Dice } from "./diceRolls";
import { attackRoll } from "./attack";

// I have changed the setting of this game and thus the power names. It is too much to change right now, so some of the names are from the old setting.
// This stuff needs to be refactored

const justDoDamage = function (user, target, enemyIndex) {
  const updatedStats = {
    ...target,
    stats: {
      ...target.stats,
      currentWounds: target.stats.currentWounds - 3,
    },
  };
  console.log(user.information.name, " does 3 damage.");
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

// Doctrine of Ignis
const applyStrengthAttackBuff = function (user, target, enemyIndex) {
  const updatedStats = {
    ...user,
    statModifiers: {
      ...user.statModifiers,
      strengthMod: user.statModifiers.strengthMod + 1,
    },
  };
  return { combatTeam: 0, updatedStats, targetID: enemyIndex };
};

const ignisDamagePower = function (user, target, enemyIndex) {
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
  return { combatTeam: 1, updatedStats, targetID: enemyIndex };
};

// Doctrine of Lux
const applyPowerHitCastBonus = function (user, target, enemyIndex) {
  const updatedStats = {
    ...user,
    statModifiers: {
      ...user.statModifiers,
      powerActivationMod: user.statModifiers.powerActivationMod + 1,
      skillMod: user.statModifiers.skillMod + 1,
    },
  };
  return { combatTeam: 0, updatedStats, targetID: enemyIndex };
};

const luxDamagePower = function (user, target, enemyIndex) {
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
  return { combatTeam: 1, updatedStats, targetID: enemyIndex };
};

// Doctrine of Ferrum
const applyPowerWeakenEnemyArmour = function (user, target, enemyIndex) {
  const updatedStats = {
    ...user,
    statModifiers: {
      ...user.statModifiers,
      armourMod: user.statModifiers.armourMod - 1,
    },
  };
  return { combatTeam: 0, updatedStats, targetID: enemyIndex };
};

const ferrumDamagePower = function (user, target, enemyIndex) {
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
  return { combatTeam: 1, updatedStats, targetID: enemyIndex };
};

// Doctrine of Vita
const applyPowerHealWounds = function (user, target, enemyIndex) {
  const healAmount = rollXDiceD3(1)[0] + 1;
  const updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      currentWounds: user.stats.currentWounds + healAmount,
    },
  };
  return { combatTeam: 0, updatedStats, targetID: enemyIndex };
};

const vitaDamagePower = function (user, target, enemyIndex) {
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
  return { combatTeam: 1, updatedStats, targetID: enemyIndex };
};

// Doctrine of Umbra
const applyPowerReduceHit = function (user, target, enemyIndex) {
  const updatedStats = {
    ...target,
    statModifiers: {
      ...user.statModifiers,
      skillMod: target.statModifiers.skillMod - 1,
    },
  };
  return { combatTeam: 1, updatedStats, targetID: enemyIndex };
};

const umbraDamagePower = function (user, target, enemyIndex) {
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
  return { combatTeam: 1, updatedStats, targetID: enemyIndex };
};

// Doctrine of Bestiarum
const applyAttackBuff = function (user, target, enemyIndex) {
  const updatedStats = {
    ...user,
    statModifiers: {
      ...user.statModifiers,
      attacksMod: user.statModifiers.attacksMod + 1,
    },
  };
  return { combatTeam: 0, updatedStats, targetID: enemyIndex };
};

const bestiarumDamagePower = function (user, target, enemyIndex) {
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
  return { combatTeam: 1, updatedStats, targetID: enemyIndex };
};

// Doctrine of Mortis
const applyToughness = function (user, target, enemyIndex) {
  const updatedStats = {
    ...user,
    statModifiers: {
      ...user.statModifiers,
      toughnessMod: user.statModifiers.toughnessMod + 1,
    },
  };
  return { combatTeam: 0, updatedStats, targetID: enemyIndex };
};

const mortisDamagePower = function (user, target, enemyIndex) {
  const damageAmount = rollXDiceD3(1)[0];
  const updatedStats = {
    ...target,
    stats: {
      ...target.stats,
      currentWounds: target.stats.currentWounds - damageAmount,
    },
  };
  return { combatTeam: 1, updatedStats, targetID: enemyIndex };
};

// Doctrine of Coeli
const applyDamageBuff = function (user, target, enemyIndex) {
  const updatedStats = {
    ...user,
    statModifiers: {
      ...user.statModifiers,
      damageMod: user.statModifiers.damageMod + 1,
    },
  };
  return { combatTeam: 0, updatedStats, targetID: enemyIndex };
};

const coeliDamagePower = function (user, target, enemyIndex) {
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
  return { combatTeam: 1, updatedStats, targetID: enemyIndex };
};

const activatePower = function (
  user,
  enemy,
  enemyIndex,
  callbackPower,
  activationValue
) {
  const totalPowerBonus = user.statModifiers.powerActivationMod + user.stats.powerBonus;
  const activationRoll = roll2D6Dice() + totalPowerBonus;
  if (activationRoll <= 2) {
    console.log("Oh No! Misactivation!");
    return { targetID: -1 };
  } else if (activationRoll < activationValue) {
    console.log("The power was not activated!");
    return { targetID: -1 };
  }
  return callbackPower(user, enemy, enemyIndex);
};

const usePlayerPower = function (power, user, enemy, enemyIndex) {
  switch (power) {
    case 0:
      return activatePower(user, enemy, enemyIndex, justDoDamage, 5);
    case 1:
      return activatePower(user, enemy, enemyIndex, justDoDamageSelf, 5);
    case 2:
      return activatePower(user, enemy, enemyIndex, applyStrengthAttackBuff, 5);
    case 3:
      return activatePower(user, enemy, enemyIndex, ignisDamagePower, 5);
    case 4:
      return activatePower(user, enemy, enemyIndex, applyPowerHitCastBonus, 5);
    case 5:
      return activatePower(user, enemy, enemyIndex, luxDamagePower, 5);
    case 6:
      return activatePower(
        user,
        enemy,
        enemyIndex,
        applyPowerWeakenEnemyArmour,
        5
      );
    case 7:
      return activatePower(user, enemy, enemyIndex, ferrumDamagePower, 5);
    case 8:
      return activatePower(user, enemy, enemyIndex, applyPowerHealWounds, 5);
    case 9:
      return activatePower(user, enemy, enemyIndex, vitaDamagePower, 5);
    case 10:
      return activatePower(user, enemy, enemyIndex, applyPowerReduceHit, 5);
    case 11:
      return activatePower(user, enemy, enemyIndex, umbraDamagePower, 5);
    case 12:
      return activatePower(user, enemy, enemyIndex, applyAttackBuff, 5);
    case 13:
      return activatePower(user, enemy, enemyIndex, bestiarumDamagePower, 5);
    case 14:
      return activatePower(user, enemy, enemyIndex, applyToughness, 5);
    case 15:
      return activatePower(user, enemy, enemyIndex, mortisDamagePower, 5);
    case 16:
      return activatePower(user, enemy, enemyIndex, applyDamageBuff, 5);
    case 17:
      return activatePower(user, enemy, enemyIndex, coeliDamagePower, 5);

    default:
      console.log(`Sorry power just didn't work.`);
  }
};

export { usePlayerPower };
