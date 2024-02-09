import { usePower } from "../helpers/powers";

describe("Testing the stat modifing powers different powers", () => {
  const testStats = {
    stats: {
      strength: 5,
      toughness: 5,
      initiative: 5,
      castBonus: 10,
      wounds: 5,
      currentWounds: 5,
    },
    statModifiers: {
      strengthMod: 0,
      attacksMod: 0,
      toughnessMod: 0,
      initiativeMod: 0,
      castBonusMod: 0,
      damageMod: 0,
      skillMod: 0,
      armourMod: 0,
    },
    save: {
      armour: 10,
      shield: 0,
      ward: 7,
    },
  };

  test("Test applyStrengthAttackBuff", () => {
    const buffedStrength = usePower(2, testStats, testStats);
    expect(
      buffedStrength.updatedStats.statModifiers.strengthMod
    ).toBeGreaterThan(0);
  });

  test("Test applyPowerHitCastBonus", () => {
    const buffHitCast = usePower(4, testStats, testStats);
    expect(buffHitCast.updatedStats.statModifiers.skillMod).toBeGreaterThan(0);
    expect(buffHitCast.updatedStats.statModifiers.castBonusMod).toBeGreaterThan(
      0
    );
  });

  test("Test applyPowerWeakenEnemyArmour", () => {
    const reducedArmour = usePower(6, testStats, testStats);
    expect(reducedArmour.updatedStats.statModifiers.armourMod).toBeLessThan(0);
  });

  test("Test applyPowerHealWounds", () => {
    const reducedArmour = usePower(8, testStats, testStats);
    expect(reducedArmour.updatedStats.stats.currentWounds).toBeGreaterThan(
      testStats.stats.currentWounds
    );
  });

  test("Test applyPowerReduceHit", () => {
    const reducedHit = usePower(10, testStats, testStats);
    expect(reducedHit.updatedStats.statModifiers.skillMod).toBeLessThan(0);
  });

  test("Test applyAttackBuff", () => {
    const bonusAttacks = usePower(12, testStats, testStats);
    expect(bonusAttacks.updatedStats.statModifiers.attacksMod).toBeGreaterThan(
      0
    );
  });

  test("Test applyToughness", () => {
    const bonusToughness = usePower(14, testStats, testStats);
    expect(
      bonusToughness.updatedStats.statModifiers.toughnessMod
    ).toBeGreaterThan(0);
  });

  test("Test applyDamageBuff", () => {
    const bonusDamage = usePower(16, testStats, testStats);
    expect(bonusDamage.updatedStats.statModifiers.damageMod).toBeGreaterThan(0);
  });
});

describe("Testing the powers that are attacks", () => {
  const testStats = {
    stats: {
      strength: 5,
      toughness: 5,
      initiative: 5,
      castBonus: 10,
      wounds: 5,
      currentWounds: 5,
    },
    statModifiers: {
      strengthMod: 0,
      attacksMod: 0,
      toughnessMod: 0,
      initiativeMod: 0,
      castBonusMod: 0,
      damageMod: 0,
      skillMod: 0,
      armourMod: 0,
    },
    save: {
      armour: 10,
      shield: 0,
      ward: 7,
    },
  };

  test("Test ignisDamagePower", () => {
    const statsAfterPower = usePower(3, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });

  test("Test luxDamagePower", () => {
    const statsAfterPower = usePower(5, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });

  test("Test ferrumDamagePower", () => {
    const statsAfterPower = usePower(7, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });

  test("Test vitaDamagePower", () => {
    const statsAfterPower = usePower(9, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });

  test("Test umbraDamagePower", () => {
    const statsAfterPower = usePower(11, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });

  test("Test bestiarumDamagePower", () => {
    const statsAfterPower = usePower(13, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });

  test("Test mortisDamagePower", () => {
    const statsAfterPower = usePower(15, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds
    );
  });

  test("Test coeliDamagePower", () => {
    const statsAfterPower = usePower(17, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });
});
