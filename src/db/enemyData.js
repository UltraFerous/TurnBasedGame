const enemyObj = [
  {
    information: {
      name: "Te'st",
      class: "Test",
      description: "Test",
    },
    stats: {
      strength: 2,
      toughness: 2,
      initiative: 2,
      castBonus: 0,
      wounds: 2,
      currentWounds: 2,
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
        strengthBonus: 2,
        rend: 1,
        damage: 2,
        attacks: 1,
      },
    ],
    powers: [
      {
        id: 0,
        name: "name",
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
  {
    information: {
      name: "2",
      class: "Test",
      description: "Test",
    },
    stats: {
      strength: 3,
      toughness: 3,
      initiative: 5,
      castBonus: 2,
      wounds: 3,
      currentWounds: 3,
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
        skill: 2,
        strengthBonus: 10,
        rend: 10,
        damage: 20,
        attacks: 3,
      },
    ],
    powers: [
      {
        id: 0,
        name: "name",
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

export default enemyObj;
