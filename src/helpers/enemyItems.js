import { removeOverheal } from "./removeOverheal";

const smallMedKit = function (user, enemy, itemData, itemIndex, targetIndex) {
  const healAmount = itemData.heal;
  const enemyItemLog = [];
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
  enemyItemLog.push(
    `${user.information.name} uses a Medkit to restore 4 wounds.`
  );
  updatedStats = removeOverheal(updatedStats, user);
  return { combatTeam: 1, updatedStats, targetID: targetIndex, enemyItemLog };
};

const useEnemyItem = function (itemIndex, itemData, user, enemy, targetIndex) {
  return smallMedKit(user, enemy, itemData, itemIndex, targetIndex);
};

export { useEnemyItem };
