import { rollXDiceD3 } from "./diceRolls";
import { removeOverheal } from "./removeOverheal";
import itemShopInventory from "../db/itemShopDatabase";

const smallMedKit = function (user, enemy, itemData, itemIndex) {
  const healAmount = itemData.heal;
  // Create a new items array with the updated potion
  const updatedItems = user.items;
  updatedItems.splice(itemIndex, 1);
  // Create the updatedStats object with the new items array
  let updatedStats = {
    ...user,
    stats: {
      ...user.stats,
      currentWounds: user.stats.currentWounds + healAmount,
    },
    items: updatedItems,
  };
  console.log(user.information.name, " uses a MedKit.");
  updatedStats = removeOverheal(updatedStats, user);
  return { combatTeam: 0, updatedStats, targetID: 0 };
};

const useItem = function (itemIndex, itemData, user, enemy) {
  return smallMedKit(user, enemy, itemData, itemIndex);
};

export { useItem };
