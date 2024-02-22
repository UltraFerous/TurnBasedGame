import { rollXDiceD3 } from "./diceRolls";
import { removeOverheal } from "./removeOverheal";

const itemRemover = function (updatedStats, updatedItem, itemIndex) {
  // If there are no potions left AFTER the remove the item from the enemy inventory
  if (updatedItem.amount < 1) {
    console.log("NO POTIONS -VARIAN");
    updatedStats.items.splice(itemIndex, 1);
  }
  return updatedStats;
};

const smallHealthPotion = function (user, enemy, targetIndex, itemIndex) {
  // Update the potion amount
  const updatedPotion = {
    ...user.items[0],
    amount: user.items[0].amount - 1,
  };
  // Create a new items array with the updated potion
  let updatedItems = [updatedPotion, ...user.items.splice(0, 0)];
  // Create the updatedStats object with the new items array
  let updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      currentWounds: user.stats.currentWounds + 3,
    },
    items: updatedItems,
  };
  updatedStats = itemRemover(updatedStats, updatedPotion, itemIndex);
  console.log(user.information.name, " uses a potion.");
  updatedStats = removeOverheal(updatedStats, user);
  return { combatTeam: 1, updatedStats, targetID: targetIndex };
};

const useEnemyItem = function (item, user, enemy, targetIndex) {
  switch (item) {
    case 0:
      return smallHealthPotion(user, enemy, targetIndex, 0);
    default:
      console.log(`Sorry item just didn't work.`);
  }
};

export { useEnemyItem };
