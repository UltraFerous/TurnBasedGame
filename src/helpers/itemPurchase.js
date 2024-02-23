import itemShopInventory from "../db/itemShopDatabase";

const purchaseMedKitPotion = function (userStats, itemIndex, itemInformation) {
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

const purchaseStatUpgrade = function (userStats, itemIndex, itemInformation) {
  const updatedStats = { ...userStats };
  if (updatedStats.stats.hasOwnProperty(itemInformation.stat)) {
    updatedStats.stats[itemInformation.stat]++;
  } else if (updatedStats.statBonuses.hasOwnProperty(itemInformation.stat)) {
    updatedStats.statBonuses[itemInformation.stat]++;
  } else {
    console.error(
      `Stat ${itemInformation.stat} not found in userStats object.`
    );
  }
  console.log(updatedStats);
  return { updatedStats, transaction: true };
};

const purchaseArmour = function (userStats, itemIndex, itemInformation) {
  const updatedStats = { ...userStats };
  updatedStats.armour = {
    ...itemInformation.stats,
  };
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
  const itemType = itemShopInventory[itemIndex].type;
  const itemInformation = itemShopInventory[itemIndex];
  const itemCost = itemShopInventory[itemIndex].cost;

  if (itemType === 3) {
    return moneyChecker(
      userStats,
      itemIndex,
      itemInformation,
      itemCost,
      purchaseArmour,
      true
    );
  }
  if (itemType === 2) {
    return moneyChecker(
      userStats,
      itemIndex,
      itemInformation,
      itemCost,
      purchaseWeapon,
      true
    );
  }
  if (itemType === 1) {
    return moneyChecker(
      userStats,
      itemIndex,
      itemInformation,
      itemCost,
      purchaseMedKitPotion,
      false
    );
  }
  if (itemType === 4) {
    return moneyChecker(
      userStats,
      itemIndex,
      itemInformation,
      itemCost,
      purchaseStatUpgrade,
      false
    );
  }
  console.log(`Sorry item just didn't work.`);
};

export { itemPurchase };
