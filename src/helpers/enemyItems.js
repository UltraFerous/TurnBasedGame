import { rollXDiceD3 } from "./diceRolls";
import { removeOverheal } from "./removeOverheal";

const amountChecker = function (updatedItem) {
  if (updatedItem.amount < 0) {
    console.log("NO POTIONS -VARIAN");
    return true;
  }
  return false;
};

const smallHealthPotion = function (user, enemy, targetIndex, itemIndex) {
  // Update the potion amount
  const updatedPotion = {
    ...user.items[0],
    amount: user.items[0].amount - 1,
  };
  // If there are no potions left AFTER the update return the original stats since nothing should change.
  if (amountChecker(updatedPotion)) {
    return { combatTeam: 1, updatedStats: user, targetID: targetIndex };
  }
  // Create a new items array with the updated potion
  const updatedItems = [updatedPotion, ...user.items.splice(0, 0)];
  // Create the updatedStats object with the new items array
  let updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      currentWounds: user.stats.currentWounds + 3,
    },
    items: updatedItems,
  };
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
