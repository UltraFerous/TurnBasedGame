// 1 is for MedKit, 2 is for weapons, 3 is for armour, 4 is for SINGLE stat buffs
const itemShopInventory = [
  {
    id: 0,
    type: 1,
    name: "Standard MedKit",
    description: "A standard issue MedKit.",
    cost: 50,
    heal: 4,
  },
  // Melee Weapons
  {
    id: 1,
    type: 2,
    name: "Quantum Blade",
    cost: 100,
    description:
      "A sleek, high-tech sword infused with quantum energy, capable of slicing through armored foes with ease.",
    stats: {
      skill: {
        type: "melee",
        value: 5,
      },
      weaponStrength: 3,
      rend: 6,
      damage: 4,
      attacks: 4,
    },
  },
  {
    id: 2,
    type: 2,
    name: "Thunder Maul",
    description:
      "A massive electrified hammer, delivering bone-crushing blows that shock and incapacitate enemies.",
    cost: 100,
    stats: {
      skill: {
        type: "melee",
        value: 7,
      },
      weaponStrength: 4,
      rend: 5,
      damage: 6,
      attacks: 2,
    },
  },
  {
    id: 3,
    type: 2,
    name: "Nanite Fangs",
    description:
      "Dual carbon-fiber daggers coated with swarming nanobots, dissolving armor and flesh upon contact.",
    cost: 100,
    stats: {
      skill: {
        type: "melee",
        value: 6,
      },
      weaponStrength: 2,
      rend: 7,
      damage: 3,
      attacks: 5,
    },
  },
  {
    id: 4,
    type: 2,
    name: "Plasma Saber",
    description:
      "A blade crackling with searing plasma, capable of cauterizing wounds as it cleaves through enemy ranks.",
    cost: 100,
    stats: {
      skill: {
        type: "melee",
        value: 6,
      },
      weaponStrength: 3,
      rend: 5,
      damage: 5,
      attacks: 3,
    },
  },
  {
    id: 5,
    type: 2,
    name: "Pulse Baton",
    description:
      "A collapsible baton pulsating with kinetic energy, delivering swift and precise strikes to disable adversaries.",
    cost: 100,
    stats: {
      skill: {
        type: "melee",
        value: 4,
      },
      weaponStrength: 2,
      rend: 4,
      damage: 3,
      attacks: 6,
    },
  },
  {
    id: 6,
    type: 2,
    name: "Sonic Edge",
    description:
      "A curved blade emitting powerful sonic waves upon impact, disrupting enemy formations and shattering defenses.",
    cost: 100,
    stats: {
      skill: {
        type: "melee",
        value: 5,
      },
      weaponStrength: 3,
      rend: 6,
      damage: 4,
      attacks: 4,
    },
  },
  {
    id: 7,
    type: 2,
    name: "Railgun Pike",
    description:
      "A polearm equipped with a railgun mechanism, launching metal projectiles at hypersonic speeds to impale distant targets.",
    cost: 100,
    stats: {
      skill: {
        type: "melee",
        value: 8,
      },
      weaponStrength: 4,
      rend: 8,
      damage: 6,
      attacks: 2,
    },
  },
  {
    id: 8,
    type: 2,
    name: "Gravity Gauntlets",
    description:
      "Gauntlets harnessing gravitational forces, allowing the wearer to crush foes with gravitational waves or hurl them through the air with telekinetic force.",
    cost: 100,
    stats: {
      skill: {
        type: "melee",
        value: 7,
      },
      weaponStrength: 3,
      rend: 7,
      damage: 5,
      attacks: 3,
    },
  },
  {
    id: 9,
    type: 2,
    name: "Vibro Axe",
    description:
      "An axe with a vibrating edge, capable of slicing through solid materials and causing internal damage with its reverberating strikes.",
    cost: 100,
    stats: {
      skill: {
        type: "melee",
        value: 6,
      },
      weaponStrength: 4,
      rend: 6,
      damage: 6,
      attacks: 2,
    },
  },
  {
    id: 10,
    type: 2,
    name: "Ionic Whip",
    description:
      "A whip crackling with ionized energy, capable of lashing out with lightning-fast strikes that electrocute and immobilize opponents.",
    cost: 100,
    stats: {
      skill: {
        type: "melee",
        value: 5,
      },
      weaponStrength: 2,
      rend: 5,
      damage: 4,
      attacks: 5,
    },
  },
  {
    id: 22,
    type: 2,
    name: `Mk. IX Temporal Blade - "Chrono Slicer"`,
    description:
      "This experimental blade harnesses quantum fluctuations to tear through the fabric of time and space, allowing its wielder to strike at enemies with unmatched speed and precision, leaving behind rifts of temporal instability in its wake.",
    cost: 100,
    stats: {
      skill: {
        type: "range",
        value: 8,
      },
      weaponStrength: 4,
      rend: 8,
      damage: 6,
      attacks: 5,
    },
  },
  // Ranged Weapons
  {
    id: 11,
    type: 2,
    name: "Photon Blaster",
    cost: 100,
    description:
      "A rifle emitting concentrated beams of photon energy, capable of piercing through multiple targets with pinpoint accuracy.",
    stats: {
      skill: {
        type: "range",
        value: 5,
      },
      weaponStrength: 3,
      rend: 6,
      damage: 4,
      attacks: 3,
    },
  },
  {
    id: 12,
    type: 2,
    name: "Plasma Launcher",
    description:
      "A shoulder-mounted launcher firing orbs of superheated plasma, engulfing enemies in fiery explosions.",
    cost: 100,
    stats: {
      skill: {
        type: "range",
        value: 6,
      },
      weaponStrength: 3,
      rend: 5,
      damage: 5,
      attacks: 2,
    },
  },
  {
    id: 13,
    type: 2,
    name: "Magnetic Rail Rifle",
    description:
      "A rifle utilizing magnetic rails to propel metal slugs at incredible velocities, punching through armor with devastating force.",
    cost: 100,
    stats: {
      skill: {
        type: "range",
        value: 7,
      },
      weaponStrength: 4,
      rend: 8,
      damage: 6,
      attacks: 1,
    },
  },
  {
    id: 14,
    type: 2,
    name: "Nanite Grenade Launcher",
    description:
      "A launcher firing grenades filled with swarming nanobots, which disassemble enemy equipment and incapacitate soldiers.",
    cost: 100,
    stats: {
      skill: {
        type: "range",
        value: 6,
      },
      weaponStrength: 2,
      rend: 4,
      damage: 3,
      attacks: 4,
    },
  },
  {
    id: 15,
    type: 2,
    name: "Electrostatic Disruptor",
    description:
      "A pistol emitting bolts of electric energy, disrupting enemy electronics and stunning targets with non-lethal force.",
    cost: 100,
    stats: {
      skill: {
        type: "range",
        value: 5,
      },
      weaponStrength: 2,
      rend: 4,
      damage: 2,
      attacks: 5,
    },
  },
  {
    id: 16,
    type: 2,
    name: "Vortex Cannon",
    description:
      "A handheld cannon creating miniature vortexes, pulling enemies into a swirling maelstrom of destruction.",
    cost: 100,
    stats: {
      skill: {
        type: "range",
        value: 6,
      },
      weaponStrength: 3,
      rend: 6,
      damage: 4,
      attacks: 3,
    },
  },
  {
    id: 17,
    type: 2,
    name: "Sonic Disruptor Rifle",
    description:
      "A rifle emitting powerful sonic waves, capable of disorienting and incapacitating foes with concussive force.",
    cost: 100,
    stats: {
      skill: {
        type: "range",
        value: 5,
      },
      weaponStrength: 2,
      rend: 5,
      damage: 3,
      attacks: 4,
    },
  },
  {
    id: 18,
    type: 2,
    name: "EMP Sniper Rifle",
    description:
      "A sniper rifle firing electromagnetic pulses, disabling enemy vehicles and electronics from long distances.",
    cost: 100,
    stats: {
      skill: {
        type: "range",
        value: 7,
      },
      weaponStrength: 3,
      rend: 7,
      damage: 5,
      attacks: 2,
    },
  },
  {
    id: 19,
    type: 2,
    name: "Plasma Repeater",
    description:
      "A rapid-fire weapon spewing streams of plasma, melting through enemy defenses with sustained firepower.",
    cost: 100,
    stats: {
      skill: {
        type: "range",
        value: 6,
      },
      weaponStrength: 3,
      rend: 6,
      damage: 4,
      attacks: 4,
    },
  },
  {
    id: 20,
    type: 2,
    name: "Particle Beam Cannon",
    description:
      "A mounted cannon firing beams of charged particles, capable of obliterating fortified positions and armored vehicles with its intense energy blasts.",
    cost: 100,
    stats: {
      skill: {
        type: "range",
        value: 8,
      },
      weaponStrength: 4,
      rend: 8,
      damage: 8,
      attacks: 1,
    },
  },
  {
    id: 21,
    type: 2,
    name: `Singularity Cannon VX-1000 - "Event Horizon Blaster"`,
    description:
      "The pinnacle of advanced weaponry, this rifle fires concentrated beams of neutrinos capable of collapsing matter into miniature black holes, annihilating even the most fortified enemy positions with unparalleled destructive power.",
    cost: 100,
    stats: {
      skill: {
        type: "range",
        value: 8,
      },
      weaponStrength: 5,
      rend: 8,
      damage: 6,
      attacks: 4,
    },
  },
  //unbubji
  {
    id: 11,
    type: 3,
    name: "Quantum Weave",
    description:
      "A cutting-edge suit interwoven with quantum fibers, providing exceptional protection against physical and energy-based attacks.",
    cost: 100,
    stats: {
      armor: 2,
      shield: 8,
    },

    id: 12,
    type: 3,
    name: "Voidsteel Vestments",
    description:
      "Forged from the mysterious Voidsteel, these vestments offer unparalleled defense against supernatural forces. The material resonates with the void.",
    cost: 100,
    stats: {
      armor: 4,
      shield: 11,
    },
    id: 13,
    type: 3,
    name: "NebulaGuard Suit",
    description:
      "Crafted from rare NebulaGuard alloy, this suit offers a harmonious blend of durability and agility. Its surface refracts light, making the wearer partially invisible.",
    cost: 100,
    stats: {
      armor: 3,
      shield: 10,
    },
    id: 14,
    type: 3,
    name: "Photon Barrier Armor",
    description:
      "Featuring a state-of-the-art photon barrier technology, this armor generates a protective energy field that absorbs and disperses incoming attacks. Lightweight and versatile, it ensures both mobility and defense.",
    cost: 100,
    stats: {
      armor: 2,
      shield: 6,
    },
  },
  {
    id: 15,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Strength Augmenter",
    description:
      "A wristband infused with gravitic energy that enhances your physical strength.",
    stat: "strength",
  },
  {
    id: 16,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Toughhide Elixir",
    description:
      "A vial containing a mixture of rare plant extracts and minerals that toughen your skin and muscles.",
    stat: "toughness",
  },
  {
    id: 17,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Initiative Amulet",
    description:
      "A mystical amulet adorned with a time-bending crystal that heightens your reflexes and quick thinking.",
    stat: "initiative",
  },
  {
    id: 18,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Power Core Catalyst",
    description:
      "A small, radiant device that harnesses and channels pure energy. Activating it unleashes latent power within you.",
    stat: "power",
  },
  {
    id: 19,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Vitality Band",
    description: "A band that enhances your body's natural healing processes.",
    stat: "wounds",
  },
  {
    id: 20,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Brutal Force Module",
    description:
      "An upgrade module for your weaponry that adds a raw, brute force element.",
    stat: "damageBonus",
  },
  {
    id: 21,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Energized Core Amplifier",
    description: "A device that amplifies the inherent power in your attacks.",
    stat: "powerDamageBonus",
  },
  {
    id: 22,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Skill Matrix Enhancer",
    description:
      "An advanced neural interface that enhances your cognitive abilities.",
    stat: "skillBonus",
  },
  {
    id: 23,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Multi-Strike Module",
    description:
      " An augmentation for your combat gear that enables faster and more precise attacks.",
    stat: "attacksBonus",
  },
];

export default itemShopInventory;
