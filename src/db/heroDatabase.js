const heroDatabase = [
  {
    information: {
      id: 0,
      name: "J",
      class: "Test",
      description: "Test",
    },
    stats: {
      strength: 3,
      toughness: 3,
      initiative: 5,
      castBonus: 1,
      wounds: 4,
      currentWounds: 4,
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
    weapons: [
      {
        id: 0,
        name: "Attack 1",
        skill: 5,
        strengthBonus: 1,
        rend: 1,
        damage: 2,
        attacks: 4,
      },
    ],
    powers: [
      {
        id: 4,
        name: "Buff Spell",
        description: "",
      },
      {
        id: 5,
        name: "Damage Spell",
        description: "",
      },
    ],
    save: {
      armour: 5,
      shield: 0,
      ward: 7,
    },
    items: [],
  },
  {
    information: {
      id: 1,
      name: "M",
      class: "Test",
      description: "Test",
    },
    stats: {
      strength: 3,
      toughness: 3,
      initiative: 4,
      castBonus: 0,
      wounds: 4,
      currentWounds: 4,
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
    weapons: [
      {
        id: 0,
        name: "Attack 1",
        skill: 3,
        strengthBonus: 2,
        rend: 3,
        damage: 2,
        attacks: 2,
      },
    ],
    powers: [
      {
        id: 16,
        name: "Buff Spell",
        description: "",
      },
      {
        id: 17,
        name: "Damage Spell",
        description: "",
      },
    ],
    save: {
      armour: 5,
      shield: 0,
      ward: 7,
    },
    items: [],
  },
  {
    information: {
      id: 2,
      name: "R",
      class: "Test",
      description: "Test",
    },
    stats: {
      strength: 3,
      toughness: 4,
      initiative: 3,
      castBonus: 0,
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
    weapons: [
      {
        id: 0,
        name: "Attack 1",
        skill: 4,
        strengthBonus: 3,
        rend: 2,
        damage: 2,
        attacks: 1,
      },
    ],
    powers: [
      {
        id: 16,
        name: "Buff Spell",
        description: "",
      },
      {
        id: 15,
        name: "Damage Spell",
        description: "",
      },
    ],
    save: {
      armour: 4,
      shield: 0,
      ward: 7,
    },
    items: [],
  },
];

export default heroDatabase;
