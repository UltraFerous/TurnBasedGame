// Rolls X amount of D6 dice
const rollXDice = function (amount) {
  const diceResults = [];
  for (let i = 0; i < amount; i++) {
    let roll = Math.floor(Math.random() * 6 + 1);
    diceResults.push(roll);
  }
  return diceResults;
};

// Rolls X amount of D3 dice
const rollXDiceD3 = function (amount) {
  const diceResults = [];
  for (let i = 0; i < amount; i++) {
    let roll = Math.floor(Math.random() * 3 + 1);
    diceResults.push(roll);
  }
  return diceResults;
};

// Rolls X amount of D3 dice
const roll2D6Dice = function (amount) {
  const twoRolls = rollXDice(2);
  const sumRolls = twoRolls.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sumRolls;
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

// Finds which hit roll is needed.
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
  return 5;
};

export {
  rollXDice,
  rollXDiceD3,
  roll2D6Dice,
  filterDicePoolAbove,
  filterDicePoolBelow,
  woundComparison,
};
