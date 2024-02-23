// 1 is for MedKit, 2 is for weapons, 3 is for armour
const itemShopInventory = [
  {
    id: 0,
    type: 1,
    name: "Standard MedKit",
    description: "A standard issue MedKit.",
  },
  {
    id: 1,
    type: 2,
    name: "Quantum Blade",
    cost: 100,
    description:
      "A razor-sharp blade infused with quantum energy, capable of slicing through armor effortlessly.",
    stats: {
      skill: 3,
      weaponStrength: 4,
      rend: 2,
      damage: 3,
      attacks: 3,
    },
  },
  {
    id: 2,
    type: 2,
    name: "Nebula Repeater",
    description:
      "An advanced firearm that harnesses the power of distant nebulae.",
    cost: 100,
    stats: {
      skill: 5,
      weaponStrength: 2,
      rend: 1,
      damage: 2,
      attacks: 5,
    },
  },
  {
    id: 3,
    type: 2,
    name: "Plasma Fang",
    description:
      "This melee weapon emits searing plasma, burning through defenses with each strike.",
    cost: 100,
    stats: {
      skill: 2,
      weaponStrength: 5,
      rend: 3,
      damage: 4,
      attacks: 2,
    },
  },
  {
    id: 4,
    type: 2,
    name: "Singularity Spear",
    description: "A polearm with a miniature singularity generator at its tip.",
    cost: 100,
    stats: {
      skill: 4,
      weaponStrength: 3,
      rend: 4,
      damage: 5,
      attacks: 1,
    },
  },
  {
    id: 5,
    type: 2,
    name: "Starburst Pistol",
    description:
      "A compact sidearm that releases bursts of energy resembling miniature starbursts.",
    cost: 100,
    stats: {
      skill: 6,
      weaponStrength: 1,
      rend: 1,
      damage: 1,
      attacks: 6,
    },
  },
  {
    id: 6,
    type: 2,
    name: "Aetheric Hammer",
    description:
      "This massive hammer channels the power of the aether, delivering devastating blows that can shatter both armor and morale. ",
    cost: 100,
    stats: {
      skill: 3,
      weaponStrength: 4,
      rend: 2,
      damage: 3,
      attacks: 3,
    },
  },
  {
    id: 7,
    type: 2,
    name: "Void Cannon",
    description:
      "A shoulder-mounted cannon that fires concentrated void energy, creating temporary void zones on impact.",
    cost: 100,
    stats: {
      skill: 5,
      weaponStrength: 2,
      rend: 1,
      damage: 2,
      attacks: 5,
    },
  },
  {
    id: 8,
    type: 2,
    name: "Lunar Scythe",
    description:
      "A crescent-shaped scythe imbued with lunar energy, allowing the wielder to manipulate gravity with each swing.",
    cost: 100,
    stats: {
      skill: 2,
      weaponStrength: 5,
      rend: 3,
      damage: 4,
      attacks: 2,
    },
  },
  {
    id: 9,
    type: 2,
    name: "Galactic Rapier",
    description:
      "A sleek and elegant rapier with a cosmic edge, allowing for swift and precise attacks. ",
    cost: 100,
    stats: {
      skill: 4,
      weaponStrength: 3,
      rend: 4,
      damage: 5,
      attacks: 1,
    },
  },
  {
    id: 10,
    type: 2,
    name: "Quasar Blaster",
    description:
      "A handheld blaster that emits quasar-like energy projectiles.",
    cost: 100,
    stats: {
      skill: 6,
      weaponStrength: 1,
      rend: 1,
      damage: 1,
      attacks: 6,
    },
    id: 11,
    type: 3,
    name: "Quantum Weave",
    description:
      "A cutting-edge suit interwoven with quantum fibers, providing exceptional protection against physical and energy-based attacks.",
    cost: 100,
    stats: {
      armor: 2,
      shield: 0,
      ward: 5,
    },
    id: 12,
    type: 3,
    name: "Voidsteel Vestments",
    description:
      "Forged from the mysterious Voidsteel, these vestments offer unparalleled defense against supernatural forces. The material resonates with the void.",
    cost: 100,
    stats: {
      armor: 4,
      shield: 0,
      ward: 7,
    },
    id: 13,
    type: 3,
    name: "NebulaGuard Suit",
    description:
      "Crafted from rare NebulaGuard alloy, this suit offers a harmonious blend of durability and agility. Its surface refracts light, making the wearer partially invisible.",
    cost: 100,
    stats: {
      armor: 3,
      shield: 0,
      ward: 6,
    },
    id: 14,
    type: 3,
    name: "Photon Barrier Armor",
    description:
      "Featuring a state-of-the-art photon barrier technology, this armor generates a protective energy field that absorbs and disperses incoming attacks. Lightweight and versatile, it ensures both mobility and defense.",
    cost: 100,
    stats: {
      armor: 2,
      shield: 0,
      ward: 4,
    },
  },
  {
    id: 15,
    type: 4,
    cost: 100,
    name: "Strength Augmenter",
    description:
      "A wristband infused with gravitic energy that enhances your physical strength.",
    stat: "strength",
  },
  {
    id: 16,
    type: 4,
    cost: 100,
    name: "Toughhide Elixir",
    description:
      "A vial containing a mixture of rare plant extracts and minerals that toughen your skin and muscles.",
    stat: "toughness",
  },
  {
    id: 17,
    type: 4,
    cost: 100,
    name: "Initiative Amulet",
    description:
      "A mystical amulet adorned with a time-bending crystal that heightens your reflexes and quick thinking.",
    stat: "initiative",
  },
  {
    id: 18,
    type: 4,
    cost: 100,
    name: "Power Core Catalyst",
    description:
      "A small, radiant device that harnesses and channels pure energy. Activating it unleashes latent power within you.",
    stat: "power",
  },
  {
    id: 19,
    type: 4,
    cost: 100,
    name: "Vitality Band",
    description: "A band that enhances your body's natural healing processes.",
    stat: "wounds",
  },
  {
    id: 20,
    type: 4,
    cost: 100,
    name: "Brutal Force Module",
    description:
      "An upgrade module for your weaponry that adds a raw, brute force element.",
    stat: "damageBonus",
  },
  {
    id: 21,
    type: 4,
    cost: 100,
    name: "Energized Core Amplifier",
    description: "A device that amplifies the inherent power in your attacks.",
    stat: "powerDamageBonus",
  },
  {
    id: 22,
    type: 4,
    cost: 100,
    name: "Skill Matrix Enhancer",
    description:
      "An advanced neural interface that enhances your cognitive abilities.",
    stat: "skillBonus",
  },
  {
    id: 23,
    type: 4,
    cost: 100,
    name: "Multi-Strike Module",
    description:
      " An augmentation for your combat gear that enables faster and more precise attacks.",
    stat: "attacksBonus",
  },
];

export default itemShopInventory;
