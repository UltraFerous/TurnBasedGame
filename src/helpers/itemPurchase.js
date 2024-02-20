import itemShopInventory from "../db/itemShopDatabase";

const purchaseSmallHealthPotion = function (userStats) {
  const itemIndex = itemShopInventory.findIndex((item) => item.id === 0);
  const updatedStats = { ...userStats };
  if (itemIndex >= 0) {
    updatedStats.items[itemIndex].amount++;
    return updatedStats;
  }
  updatedStats.items.push({
    id: 0,
    name: "Small Health Potion",
    description: "an small",
    amount: 1,
  });
  return updatedStats;
};

const purchaseDragonSlayer = function (userStats) {
  const updatedStats = { ...userStats };
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

const moneyChecker = function (
  userStats,
  itemID,
  itemCost,
  itemCallback,
  isConsumed
) {
  const currentMoney = userStats.scores.money;
  const updatedMoney = currentMoney - itemCost;
  if (updatedMoney < 0) {
    return userStats;
  }
  const tempStats = { ...userStats };
  tempStats.scores.money = updatedMoney;
  if (isConsumed) {
    const itemIndex = itemShopInventory.findIndex((item) => item.id === itemID);
    itemShopInventory.splice(itemIndex, 1);
  }
  return itemCallback(tempStats);
};

const itemPurchase = function (userStats, itemID) {
  switch (itemID) {
    case 0:
      return moneyChecker(
        userStats,
        itemID,
        10,
        purchaseSmallHealthPotion,
        false
      );
    case 11:
      return moneyChecker(userStats, itemID, 100, purchaseDragonSlayer, true);
    default:
      console.log(`Sorry item just didn't work.`);
  }
};

export { itemPurchase };
