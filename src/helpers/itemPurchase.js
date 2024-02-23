import itemShopInventory from "../db/itemShopDatabase";

const purchaseMedKitPotion = function (userStats, itemIndex, itemStats) {
  const updatedStats = { ...userStats };
  if (itemIndex >= 0) {
    updatedStats.items[itemIndex].amount++;
    return { updatedStats, transaction: true };
  }
  updatedStats.items.push({
    id: 0,
    name: "Standard MedKit",
    description: "A standard issue MedKit.",
    amount: 1,
  });
  return { updatedStats, transaction: true };
};

const purchaseWeapon = function (userStats, itemIndex, itemInformation) {
  const updatedStats = { ...userStats };
  updatedStats.weapons.push({
    id: itemInformation.id,
    name: itemInformation.name,
    ...itemInformation.stats,
  });
  return { updatedStats, transaction: true };
};

const moneyChecker = function (
  userStats,
  itemIndex,
  itemInformation,
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
  if (isRemoved) {
    itemShopInventory.splice(itemIndex, 1);
    itemIndex--;
  }
  return itemCallback(tempStats, itemIndex, itemInformation);
};

const itemPurchase = function (userStats, itemID) {
  const itemIndex = itemShopInventory.findIndex((item) => item.id === itemID);
  const itemInformation = itemShopInventory[itemIndex];
  const itemCost = itemShopInventory[itemIndex].cost;

  console.log(itemShopInventory[itemIndex]);

  switch (true) {
    case itemID === 0:
      return moneyChecker(
        userStats,
        itemIndex,
        itemInformation,
        itemCost,
        purchaseMedKitPotion,
        false
      );
    case 12 <= itemID:
      return moneyChecker(
        userStats,
        itemIndex,
        itemInformation,
        itemCost,
        purchaseWeapon,
        true
      );
    default:
      console.log(`Sorry item just didn't work.`);
  }
};

export { itemPurchase };
