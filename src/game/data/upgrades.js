export const UPGRADES = {
  // Passive upgrades based on the design doc
  speed: {
    id: 'speed',
    name: 'Comfy Shoes',
    description: 'Increases movement speed by 10%',
    icon: '👟',
    maxLevel: 5, // Reduced max level since each level is more impactful
    effect: (player, level) => {
      // Use base speed to avoid compounding
      const baseSpeed = 3; // Base movement speed
      player.upgrade('moveSpeed', 0.1 * baseSpeed);
    },
    getDescription: (level) => `+${10 * level}% Movement Speed`
  },
  
  pickupRadius: {
    id: 'pickupRadius',
    name: 'Long Arms',
    description: 'Increases book pickup radius by 0.1m',
    icon: '🤲',
    maxLevel: 10,
    effect: (player, level) => {
      player.upgrade('pickupRadius', 0.1);
      player.upgrade('returnRadius', 0.1);
    },
    getDescription: (level) => `+${(0.1 * level).toFixed(1)}m Pickup/Return Radius`
  },
  
  carrySlots: {
    id: 'carrySlots',
    name: 'Book Belt',
    description: 'Carry 1 additional book',
    icon: '📚',
    maxLevel: 7,
    effect: (player, level) => {
      player.upgrade('carrySlots', 1);
    },
    getDescription: (level) => `+${level} Book Slots`
  },
  
  stamina: {
    id: 'stamina',
    name: 'Fitness Training',
    description: 'Increases maximum stamina by 10',
    icon: '💪',
    maxLevel: 10,
    effect: (player, level) => {
      player.upgrade('stamina', 10);
    },
    getDescription: (level) => `+${10 * level} Max Stamina`
  },
  
  chaosDampening: {
    id: 'chaosDampening',
    name: 'Zen Focus',
    description: 'Reduces chaos gain by 2%',
    icon: '🧘',
    maxLevel: 10,
    effect: (player, level) => {
      player.upgrade('chaosDampening', 2);
    },
    getDescription: (level) => `-${2 * level}% Chaos Gain`
  },
  
  xpGain: {
    id: 'xpGain',
    name: 'Reading Glasses',
    description: 'Increases XP gain by 8%',
    icon: '👓',
    maxLevel: 5,
    effect: (player, level) => {
      player.upgrade('xpMultiplier', 0.08);
    },
    getDescription: (level) => `+${8 * level}% XP Gain`
  },
  
  // Future weapon skills (not implemented yet)
  shushWave: {
    id: 'shushWave',
    name: 'Shush Wave',
    description: 'Creates a cone of silence that stuns kids',
    icon: '🤫',
    maxLevel: 5,
    isWeapon: true,
    effect: (player, level) => {
      // TODO: Implement weapon system
    },
    getDescription: (level) => `Level ${level} Shush Wave`
  }
};

// Helper function to get random upgrades
export function getRandomUpgrades(count = 3, playerUpgrades = {}) {
  const availableUpgrades = Object.values(UPGRADES).filter(upgrade => {
    // Filter out weapons and removed upgrades
    if (upgrade.isWeapon || upgrade.id === 'health') return false;
    
    // Check if upgrade is maxed out
    const currentLevel = playerUpgrades[upgrade.id] || 0;
    return currentLevel < upgrade.maxLevel;
  });
  
  // Shuffle and pick
  const shuffled = [...availableUpgrades].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get upgrade by ID
export function getUpgrade(id) {
  return UPGRADES[id];
}