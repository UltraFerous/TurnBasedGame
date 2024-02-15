import { usePlayerPower } from "../helpers/playerPowers";

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
    const buffedStrength = usePlayerPower(2, testStats, testStats);
    expect(
      buffedStrength.updatedStats.statModifiers.strengthMod
    ).toBeGreaterThan(0);
  });

  test("Test applyPowerHitCastBonus", () => {
    const buffHitCast = usePlayerPower(4, testStats, testStats);
    expect(buffHitCast.updatedStats.statModifiers.skillMod).toBeGreaterThan(0);
    expect(buffHitCast.updatedStats.statModifiers.castBonusMod).toBeGreaterThan(
      0
    );
  });

  test("Test applyPowerWeakenEnemyArmour", () => {
    const reducedArmour = usePlayerPower(6, testStats, testStats);
    expect(reducedArmour.updatedStats.statModifiers.armourMod).toBeLessThan(0);
  });

  test("Test applyPowerHealWounds", () => {
    const reducedArmour = usePlayerPower(8, testStats, testStats);
    expect(reducedArmour.updatedStats.stats.currentWounds).toBeGreaterThan(
      testStats.stats.currentWounds
    );
  });

  test("Test applyPowerReduceHit", () => {
    const reducedHit = usePlayerPower(10, testStats, testStats);
    expect(reducedHit.updatedStats.statModifiers.skillMod).toBeLessThan(0);
  });

  test("Test applyAttackBuff", () => {
    const bonusAttacks = usePlayerPower(12, testStats, testStats);
    expect(bonusAttacks.updatedStats.statModifiers.attacksMod).toBeGreaterThan(
      0
    );
  });

  test("Test applyToughness", () => {
    const bonusToughness = usePlayerPower(14, testStats, testStats);
    expect(
      bonusToughness.updatedStats.statModifiers.toughnessMod
    ).toBeGreaterThan(0);
  });

  test("Test applyDamageBuff", () => {
    const bonusDamage = usePlayerPower(16, testStats, testStats);
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
    const statsAfterPower = usePlayerPower(3, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });

  test("Test luxDamagePower", () => {
    const statsAfterPower = usePlayerPower(5, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });

  test("Test ferrumDamagePower", () => {
    const statsAfterPower = usePlayerPower(7, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });

  test("Test vitaDamagePower", () => {
    const statsAfterPower = usePlayerPower(9, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });

  test("Test umbraDamagePower", () => {
    const statsAfterPower = usePlayerPower(11, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });

  test("Test bestiarumDamagePower", () => {
    const statsAfterPower = usePlayerPower(13, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });

  test("Test mortisDamagePower", () => {
    const statsAfterPower = usePlayerPower(15, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds
    );
  });

  test("Test coeliDamagePower", () => {
    const statsAfterPower = usePlayerPower(17, testStats, testStats);
    expect(statsAfterPower.updatedStats.stats.currentWounds).toBeLessThan(
      testStats.stats.currentWounds + 1
    );
  });
});
