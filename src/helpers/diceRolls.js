// Rolls X amount of D6 dice
const rollXDice = function (amount) {
  const diceResults = [];
  for (let i = 0; i < amount; i++) {
    let roll = Math.floor(Math.random() * 10 + 1);
    diceResults.push(roll);
  }
  return diceResults;
};

// Filters dice to only successfull results
const filterDicePoolAbove = function (rolls, target) {
  const filterDiceResults = rolls.filter(
    (roll) => roll >= target || roll === 10
  );
  return filterDiceResults;
};

// Filters dice to only failed results
const filterDicePoolBelow = function (rolls, target) {
  const filterDiceResults = rolls.filter((roll) => roll < target || roll === 1);
  return filterDiceResults;
};

// Finds which roll is needed.
const diceComparison = function (user, target) {
  const skillDifference = user - target;
  let targetNumber = 6 - skillDifference;
  if (targetNumber < 1) {
    targetNumber = 1;
  }
  if (targetNumber > 10) {
    targetNumber = 10;
  }
  return targetNumber;
};

export { rollXDice, filterDicePoolAbove, filterDicePoolBelow, diceComparison };
