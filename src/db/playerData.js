const playerObj = {
  information: {
    name: "Brother Captain One",
    class: "Test",
    description: "Test",
  },
  stats: {
    strength: 4,
    toughness: 4,
    initiative: 4,
    castBonus: 1,
    wounds: 5,
    currentWounds: 5,
  },
  statModifiers: {
    strengthMod: 0,
    toughnessMod: 0,
    initiativeMod: 0,
    castBonusMod: 0,
    skillMod: 0,
  },
  weapons: [
    {
      id: 0,
      name: "Attack 1",
      skill: 4,
      strengthBonus: 1,
      rend: 1,
      damage: 1,
      attacks: 4,
    },
    {
      id: 1,
      name: "NUKE",
      skill: 1,
      strengthBonus: 10,
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
    },
    {
      id: 1,
      name: "Damage Spell Self",
      description: "",
    },
  ],
  save: {
    armour: 3,
    armourBonus: 0,
    shield: 0,
    ward: 0,
  },
};

export default playerObj;
