// Rolls X amount of D6 dice
const rollXDice = function (amount) {
  const diceResults = [];
  for (let i = 0; i < amount; i++) {
    let roll = Math.floor(Math.random() * 6 + 1);
    diceResults.push(roll);
  }
  return diceResults;
};

// Filters dice to only successfull results
const filterDicePoolAbove = function (rolls, target) {
  const filterDiceResults = rolls.filter((roll) => roll >= target);
  return filterDiceResults;
};

// Filters dice to only successfull results
const filterDicePoolBelow = function (rolls, target) {
  const filterDiceResults = rolls.filter((roll) => roll < target);
  return filterDiceResults;
};

const woundComparison = function (user, target) {
  if (user === target) {
    return 4;
  }
  if (user >= target * 2) {
    return 2;
  }
  if (user > target) {
    return 3;
  }
  if (user <= target / 2) {
    return 6;
  }
  if (user < target) {
    return 5;
  }
};

export { rollXDice, filterDicePoolAbove, filterDicePoolBelow, woundComparison };
