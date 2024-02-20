const purchaseSmallHealthPotion = function (userStats) {};

const purchaseDragonSlayer = function (userStats) {
  const updatedStats = { ...userStats };
  console.log(updatedStats);
  updatedStats.weapons.push({
    id: 11,
    name: "Dragon Slayer",
    skill: 3,
    strengthBonus: 4,
    rend: 4,
    damage: 4,
    attacks: 1,
  });
  return updatedStats;
};

const moneyChecker = function (userStats, itemCost, itemCallback) {
  const currentMoney = userStats.scores.money;
  const updatedMoney = currentMoney - itemCost;
  if (updatedMoney < 0) {
    return userStats;
  }
  const tempStats = { ...userStats };
  tempStats.scores.money = updatedMoney;
  return itemCallback(tempStats);
};

const itemPurchase = function (userStats, itemID) {
  switch (itemID) {
    case 0:
    case 11:
      return moneyChecker(userStats, 100, purchaseDragonSlayer);
    default:
      console.log(`Sorry item just didn't work.`);
  }
};

export { itemPurchase };
