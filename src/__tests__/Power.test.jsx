import { usePower } from "../helpers/powers";

test("test", () => {
  expect(true).toBe(true);
});

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
    expect(buffHitCast.updatedStats.statModifiers.castBonusMod).toBeGreaterThan(0);

  });
});
