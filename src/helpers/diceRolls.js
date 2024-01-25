// Rolls X amount of D6 dice
const rollXDice = function (amount) {
  const diceResults = [];
  for (let i = 0; i < amount; i++) {
    let roll = Math.floor(Math.random() * 6 + 1);
    diceResults.push(roll);
  }
  return diceResults;
};

export default rollXDice;
