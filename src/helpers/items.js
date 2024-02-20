import { rollXDiceD3 } from "./diceRolls";
import { removeOverheal } from "./removeOverheal";

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
  console.log(user.information.name, " uses a potion.");
  updatedStats = removeOverheal(updatedStats, user);
  return { combatTeam: 0, updatedStats, targetID: 0 };
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
