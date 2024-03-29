const playerObj = {
  information: {
    name: "Brother Captain One",
    class: "Test",
    description: "Test",
  },
  stats: {
    strength: 3,
    toughness: 4,
    initiative: 3,
    power: 0,
    wounds: 5,
    currentWounds: 5,
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
      id: 1000,
      name: "Attack 1",
      skill: 4,
      weaponStrength: 1,
      rend: 1,
      damage: 1,
      attacks: 4,
    },
    {
      id: 1001,
      name: "NUKE",
      skill: 1,
      weaponStrength: 10,
      rend: 10,
      damage: 10,
      attacks: 10,
    },
  ],
  powers: [
    {
      id: 0,
      name: "Damage Spell",
      description: "",
      activationValue: 2,
      type: 3,
      damage: 3,
    },
    {
      id: 1,
      name: "Buff attacks",
      description: "",
      activationValue: 4,
      type: 2,
      stat: "attacksMod",
      amount: 5,
    },
  ],
  save: {
    armour: 3,
    shield: 10,
  },
  items: [
    {
      id: 0,
      name: "Standard MedKit",
      description: "A standard issue MedKit.",
      heal: 4,
    },
    {
      id: 0,
      name: "Standard MedKit",
      description: "A standard issue MedKit.",
      heal: 4,
    },
    {
      id: 0,
      name: "Standard MedKit",
      description: "A standard issue MedKit.",
      heal: 4,
    },
    {
      id: 0,
      name: "Standard MedKit",
      description: "A standard issue MedKit.",
      heal: 4,
    },
    {
      id: 0,
      name: "Standard MedKit",
      description: "A standard issue MedKit.",
      heal: 4,
    },
    {
      id: 0,
      name: "Standard MedKit",
      description: "A standard issue MedKit.",
      heal: 4,
    },
    {
      id: 0,
      name: "Standard MedKit",
      description: "A standard issue MedKit.",
      heal: 4,
    },
    {
      id: 0,
      name: "Standard MedKit",
      description: "A standard issue MedKit.",
      heal: 4,
    },
  ],
  scores: {
    money: 1000,
    points: 0,
    stage: 0,
  },
};

export default playerObj;
