import { rollXDiceD3 } from "./diceRolls";
import { removeOverheal } from "./removeOverheal";

const smallMedKit = function (user, enemy, itemData, itemIndex, targetIndex) {
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
  return { combatTeam: 1, updatedStats, targetID: targetIndex };
};

const useEnemyItem = function (itemIndex, itemData, user, enemy, targetIndex) {
  return smallMedKit(user, enemy, itemData, itemIndex, targetIndex);
};

export { useEnemyItem };
