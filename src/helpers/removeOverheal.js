const removeOverheal = function(updatedStats, userStats) {
  let filtedUpdatedStats = updatedStats;
  // If the potion overheals then reset the health to maximum
  if (updatedStats.stats.currentWounds > userStats.stats.wounds) {
    filtedUpdatedStats = {
      ...updatedStats,
      stats: {
        ...userStats.stats,
        currentWounds: updatedStats.stats.wounds,
      },
    };
    console.log(userStats.information.name, "Removed overheal.");
  }
  return filtedUpdatedStats;
};

export { removeOverheal };
