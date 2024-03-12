import { removeOverheal } from "./removeOverheal";
import itemShopInventory from "../db/itemShopDatabase";

const smallMedKit = function (user, enemy, itemData, itemIndex) {
  const healAmount = itemData.heal;
  const playerItemLog = [];
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
  playerItemLog.push(
    `${user.information.name} uses a MedKit to restore 4 wounds.`
  );
  updatedStats = removeOverheal(updatedStats, user);
  return { combatTeam: 0, updatedStats, targetID: 0, playerItemLog };
};

const useItem = function (itemIndex, itemData, user, enemy) {
  return smallMedKit(user, enemy, itemData, itemIndex);
};

export { useItem };
