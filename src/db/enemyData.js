const enemyObj = {
  information: {
    name: "Te'st",
    class: "Test",
    description: "Test",
  },
  stats: {
    strength: 3,
    toughness: 3,
    initiative: 5,
    castBonus: 2,
    wounds: 8,
    currentWounds: 8,
  },
  weapons: [
    {
      id: 1,
      name: "Attack 1",
      skill: 5,
      strengthBonus: 2,
      rend: 1,
      damage: 2,
      attacks: 3,
    },
  ],
  abilities: [
    {
      id: 1,
      name: "name",
      description: "",
    },
  ],
  save: {
    armour: 4,
    armourBonus: 0,
    shield: 0,
    ward: 0,
  },
};

export default enemyObj;
