const purchaseSmallHealthPotion = function (userStats) {};

const purchaseDragonSlayer = function (userStats, itemCost) {
  const tempStats = { ...userStats };
  console.log(tempStats)
  tempStats.weapons.push({
    id: 11,
    name: "Dragon Slayer",
    skill: 3,
    strengthBonus: 4,
    rend: 4,
    damage: 4,
    attacks: 1,
  });

  tempStats.scores.money -= 100;

  return tempStats
};

const itemPurchase = function (userStats, itemID) {
  switch (itemID) {
    case 0:
      return purchaseSmallHealthPotion(userStats);
    case 11:
      return purchaseDragonSlayer(userStats, 100);
    default:
      console.log(`Sorry item just didn't work.`);
  }
};

export { itemPurchase };
