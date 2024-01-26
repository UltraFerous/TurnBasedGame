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
    
  weapons: [
    {
      id: 1,
      name: "Attack 1",
      skill: 4,
      strengthBonus: 1,
      rend: 1,
      damage: 1,
      attacks: 4,
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
    armour: 3,
    armourBonus: 0,
    shield: 0,
    ward: 0,
  },
};

export default playerObj;
