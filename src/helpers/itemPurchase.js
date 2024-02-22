import itemShopInventory from "../db/itemShopDatabase";

const purchaseSmallHealthPotion = function (userStats, itemIndex) {
  const updatedStats = { ...userStats };
  if (itemIndex >= 0) {
    updatedStats.items[itemIndex].amount++;
    return { updatedStats, transaction: true };
  }
  updatedStats.items.push({
    id: 0,
    name: "Small Health Potion",
    description: "a small",
    amount: 1,
  });
  return { updatedStats, transaction: true };
};

const purchaseDragonSlayer = function (userStats, itemIndex) {
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
  return { updatedStats, transaction: true };
};

const moneyChecker = function (
  userStats,
  itemID,
  itemCost,
  itemCallback,
  isRemoved
) {
  const currentMoney = userStats.scores.money;
  const updatedMoney = currentMoney - itemCost;
  if (updatedMoney < 0) {
    return { updatedStats: userStats, transaction: false };
  }
  const tempStats = { ...userStats };
  tempStats.scores.money = updatedMoney;
  const itemIndex = itemShopInventory.findIndex((item) => item.id === itemID);
  if (isRemoved) {
    itemShopInventory.splice(itemIndex, 1);
  }
  return itemCallback(tempStats, itemIndex);
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
