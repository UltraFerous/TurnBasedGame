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
      initiative: 10,
      power: 0,
      wounds: 6,
      currentWounds: 6,
    },
    statBonuses: {
      damageBonus: 0,
      powerDamageBonus: 0,
      skillBonus: 0,
      attacksBonus: 0,
      armourBonus: 0,
    },
    statModifiers: {
      strengthMod: 0,
      attacksMod: 0,
      toughnessMod: 0,
      initiativeMod: 0,
      powerActivationMod: 0,
      powerDamageMod: 0,
      damageMod: 0,
      skillMod: 0,
      armourMod: 0,
    },
    weapons: [
      {
        id: 0,
        name: "Attack 1",
        skill: 3,
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
    size: "medium",
  },
  {
    information: {
      name: "Guy",
      class: "Test",
      description: "Test",
    },
    stats: {
      strength: 2,
      toughness: 2,
      initiative: 2,
      power: 0,
      wounds: 6,
      currentWounds: 6,
    },
    statBonuses: {
      damageBonus: 0,
      powerDamageBonus: 0,
      skillBonus: 0,
      attacksBonus: 0,
      armourBonus: 0,
    },
    statModifiers: {
      strengthMod: 0,
      attacksMod: 0,
      toughnessMod: 0,
      initiativeMod: 0,
      powerActivationMod: 0,
      powerDamageMod: 0,
      damageMod: 0,
      skillMod: 0,
      armourMod: 0,
    },
    weapons: [
      {
        id: 0,
        name: "Attack 1",
        skill: 3,
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
      armour: 3,
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
    size: "medium",
  },
];

export default enemyObj;
