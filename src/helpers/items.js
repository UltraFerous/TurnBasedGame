import { rollXDiceD3 } from "./diceRolls";

const smallHealthPotion = function (user, enemy) {
  // Update the potion amount
  const updatedPotion = {
    ...user.items[0],
    amount: user.items[0].amount - 1,
  };
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
  // If the potion overheals then reset the health to maximum
  if (updatedStats.stats.currentWounds > user.stats.wounds) {
    updatedStats = {
      ...updatedStats,
      stats: {
        ...user.stats,
        currentWounds: updatedStats.stats.wounds,
      },
    };
    console.log(user.information.name, "uses a potion, with overheal removed.");
    return { updatedStats, targetID: 0 };
  }
  console.log(user.information.name, " uses a potion.");
  return { updatedStats, targetID: 0 };
};

const useItem = function (item, user, enemy) {
  switch (item) {
    case 0:
      return smallHealthPotion(user, enemy);
    default:
      console.log(`Sorry item just didn't work.`);
  }
};

export { useItem };
