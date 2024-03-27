const beginnierEnemyDatabase = [
  {
    information: {
      name: "Te'st",
      class: "Test",
      description: "Test",
    },
    display: {
      sprite: "",
      size: "medium",
    },
    stats: {
      strength: 2,
      toughness: 2,
      initiative: 10,
      power: 0,
      wounds: 6,
      currentWounds: 6,
      skill: {
        range: 5,
        melee: 5,
      },
    },
    statBonuses: {
      damageBonus: 0,
      powerDamageBonus: 0,
      attacksBonus: 0,
      armourBonus: 0,
    },
    statModifiers: {
      strengthMod: 0,
      attacksMod: 0,
      toughnessMod: 0,
      initiativeMod: 0,
      powerMod: 0,
      damageMod: 0,
      skillMod: 0,
      armourMod: 0,
    },
    weapons: [
      {
        id: 0,
        name: "Attack 1",
        skill: {
          type: "melee",
          value: 2,
        },
        weaponStrength: 2,
        rend: 1,
        damage: 2,
        attacks: 1,
      },
    ],
    powers: [
      {
        id: 0,
        name: "Damage Spell",
        description: "",
        activationValue: 4,
        type: 3,
        damage: 2,
      },
    ],
    save: {
      armour: 4,
      shield: 11,
    },
    items: [
      {
        id: 0,
        name: "Standard MedKit",
        description: "A standard issue MedKit.",
        heal: 4,
      },
    ],
    scores: {
      money: 100,
      points: 10,
    },
  },
];

export default beginnierEnemyDatabase;
