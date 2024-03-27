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
      "A sleek, high-tech sword infused with quantum energy, capable of slicing through armoured foes with ease.",
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
      "Dual carbon-fiber daggers coated with swarming nanobots, dissolving armour and flesh upon contact.",
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
    id: 11,
    type: 2,
    name: `Mk. IX Temporal Blade`,
    description:
      "This experimental blade harnesses quantum fluctuations to tear through the fabric of time and space, allowing its wielder to strike at enemies with unmatched speed and precision, leaving behind rifts of temporal instability in its wake.",
    cost: 100,
    stats: {
      skill: {
        type: "melee",
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
    id: 12,
    type: 2,
    name: "Photon Blaster",
    cost: 100,
    description:
      "A rifle emitting concentrated beams of photon energy, capable of piercing through multiple targets with pinpoint accuracy.",
    stats: {
      skill: {
        type: "ranged",
        value: 5,
      },
      weaponStrength: 3,
      rend: 6,
      damage: 4,
      attacks: 3,
    },
  },
  {
    id: 13,
    type: 2,
    name: "Plasma Launcher",
    description:
      "A shoulder-mounted launcher firing orbs of superheated plasma, engulfing enemies in fiery explosions.",
    cost: 100,
    stats: {
      skill: {
        type: "ranged",
        value: 6,
      },
      weaponStrength: 3,
      rend: 5,
      damage: 5,
      attacks: 2,
    },
  },
  {
    id: 14,
    type: 2,
    name: "Magnetic Rail Rifle",
    description:
      "A rifle utilizing magnetic rails to propel metal slugs at incredible velocities, punching through armour with devastating force.",
    cost: 100,
    stats: {
      skill: {
        type: "ranged",
        value: 7,
      },
      weaponStrength: 4,
      rend: 8,
      damage: 6,
      attacks: 1,
    },
  },
  {
    id: 15,
    type: 2,
    name: "Nanite Grenade Launcher",
    description:
      "A launcher firing grenades filled with swarming nanobots, which disassemble enemy equipment and incapacitate soldiers.",
    cost: 100,
    stats: {
      skill: {
        type: "ranged",
        value: 6,
      },
      weaponStrength: 2,
      rend: 4,
      damage: 3,
      attacks: 4,
    },
  },
  {
    id: 16,
    type: 2,
    name: "Electrostatic Disruptor",
    description:
      "A pistol emitting bolts of electric energy, disrupting enemy electronics and stunning targets with non-lethal force.",
    cost: 100,
    stats: {
      skill: {
        type: "ranged",
        value: 5,
      },
      weaponStrength: 2,
      rend: 4,
      damage: 2,
      attacks: 5,
    },
  },
  {
    id: 17,
    type: 2,
    name: "Vortex Cannon",
    description:
      "A handheld cannon creating miniature vortexes, pulling enemies into a swirling maelstrom of destruction.",
    cost: 100,
    stats: {
      skill: {
        type: "ranged",
        value: 6,
      },
      weaponStrength: 3,
      rend: 6,
      damage: 4,
      attacks: 3,
    },
  },
  {
    id: 18,
    type: 2,
    name: "Sonic Disruptor Rifle",
    description:
      "A rifle emitting powerful sonic waves, capable of disorienting and incapacitating foes with concussive force.",
    cost: 100,
    stats: {
      skill: {
        type: "ranged",
        value: 5,
      },
      weaponStrength: 2,
      rend: 5,
      damage: 3,
      attacks: 4,
    },
  },
  {
    id: 19,
    type: 2,
    name: "EMP Sniper Rifle",
    description:
      "A sniper rifle firing electromagnetic pulses, disabling enemy vehicles and electronics from long distances.",
    cost: 100,
    stats: {
      skill: {
        type: "ranged",
        value: 7,
      },
      weaponStrength: 3,
      rend: 7,
      damage: 5,
      attacks: 2,
    },
  },
  {
    id: 20,
    type: 2,
    name: "Plasma Repeater",
    description:
      "A rapid-fire weapon spewing streams of plasma, melting through enemy defenses with sustained firepower.",
    cost: 100,
    stats: {
      skill: {
        type: "ranged",
        value: 6,
      },
      weaponStrength: 3,
      rend: 6,
      damage: 4,
      attacks: 4,
    },
  },
  {
    id: 21,
    type: 2,
    name: "Particle Beam Cannon",
    description:
      "A mounted cannon firing beams of charged particles, capable of obliterating fortified positions and armoured vehicles with its intense energy blasts.",
    cost: 100,
    stats: {
      skill: {
        type: "ranged",
        value: 8,
      },
      weaponStrength: 4,
      rend: 8,
      damage: 8,
      attacks: 1,
    },
  },
  {
    id: 22,
    type: 2,
    name: `Singularity Cannon VX-1000`,
    description:
      "The pinnacle of advanced weaponry, this rifle fires concentrated beams of neutrinos capable of collapsing matter into miniature black holes, annihilating even the most fortified enemy positions with unparalleled destructive power.",
    cost: 100,
    stats: {
      skill: {
        type: "ranged",
        value: 8,
      },
      weaponStrength: 5,
      rend: 8,
      damage: 6,
      attacks: 4,
    },
  },
  // Armour
  {
    id: 23,
    type: 3,
    name: "Vanguard Exosuit",
    description:
      "Cutting-edge exoskeletal armour designed for frontline soldiers, enhancing strength and agility while providing advanced ballistic protection.",
    cost: 100,
    stats: {
      armour: 8,
      shield: 10,
    },
  },
  {
    id: 24,
    type: 3,
    name: "Stealth Shadowgear",
    description:
      "Sleek and lightweight armour built for covert operations, equipped with advanced camouflage technology and sound-dampening materials for silent movement.",
    cost: 100,
    stats: {
      armour: 5,
      shield: 7,
    },
  },
  {
    id: 25,
    type: 3,
    name: "Titanium Bulwark",
    description:
      "Heavy-duty armour designed for tanking roles, featuring reinforced plating and energy shielding systems to withstand intense enemy fire and protect allies.",
    cost: 100,
    stats: {
      armour: 9,
      shield: 9,
    },
  },
  {
    id: 26,
    type: 3,
    name: "Aegis Sentinel",
    description:
      "Versatile modular armour optimized for defense and support, equipped with deployable shields and medical assistance systems for sustaining troops in the heat of battle.",
    cost: 100,
    stats: {
      armour: 7,
      shield: 8,
    },
  },
  {
    id: 27,
    type: 3,
    name: "Assault Striker Mk. VI",
    description:
      "High-mobility combat suit engineered for offensive maneuvers, equipped with integrated weapon systems and rapid deployment capabilities for decisive strikes against enemy forces.",
    cost: 100,
    stats: {
      armour: 8,
      shield: 6,
    },
  },
  {
    id: 28,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Iron Gauntlets",
    description:
      "Heavy gauntlets designed for rigorous training, enhancing raw physical power and muscle strength.",
    stat: "strength",
  },
  {
    id: 29,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Reinforced Armour Plating",
    description:
      "Extra layers of durable material added to armour, providing increased resistance to physical harm and improving overall endurance.",
    stat: "toughness",
  },
  {
    id: 30,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Swift Boots",
    description:
      "Lightweight, well-crafted boots designed to increase agility and reaction time, granting the wearer quicker reflexes and the ability to act swiftly in combat.",
    stat: "initiative",
  },
  {
    id: 31,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Enhanced Reactor Core",
    description:
      "Upgraded reactor cores integrated into mechanized suits, harnessing latent energy to grant the wearer enhanced mastery over universal forces.",
    stat: "power",
  },
  {
    id: 32,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Nanotech Regenerators",
    description:
      "Advanced nanomachines infused within combat gear, swiftly repairing injuries and bolstering soldiers' resilience on the battlefield.",
    stat: "wounds",
  },
  {
    id: 33,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Precision Scope",
    description:
      "High-quality optics for firearms, enhancing accuracy and allowing for precise targeting over long distances.",
    stat: "range",
  },
  {
    id: 34,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Mastercrafted Blade",
    description:
      "A meticulously crafted melee weapon, perfectly balanced for increased accuracy and devastating strikes in close combat.",
    stat: "melee",
  },
  {
    id: 35,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Impact Amplifier Attachment",
    description:
      "Precision-engineered attachment for weapons, whether melee or ranged, focusing kinetic energy to amplify impact upon striking, resulting in greater damage output.",
    stat: "damageBonus",
  },
  {
    id: 36,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Combat Training Manual",
    description:
      "Comprehensive guides and manuals on combat techniques, providing valuable insights and strategies to improve offensive capabilities and land more effective hits.",
    stat: "attacksBonus",
  },
  {
    id: 37,
    type: 4,
    cost: 100,
    amount: 1,
    name: "Titanium Plating Upgrade",
    description:
      "Upgraded armour plating made from lightweight yet resilient titanium, offering superior protection against various types of attacks without sacrificing mobility.",
    stat: "armourBonus",
  },
];

export default itemShopInventory;
