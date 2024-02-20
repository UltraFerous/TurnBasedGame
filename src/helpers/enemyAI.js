const enemyTurnTactic = function (player, enemy) {
  const enemyWeapons = enemy.weapons;
  const enemyPowers = enemy.powers;
  const enemyItems = enemy.items;
  const enemyWeaponsOptions = enemyWeapons.length;
  const enemyPowerOptions = enemyPowers.length;
  const enemyItemOptions = enemyItems.length;
  let chosenOptionIndex = 0;
  let chosenTypeIndex = 1;

  const totalOptions =
    enemyWeaponsOptions + enemyPowerOptions + enemyItemOptions;

  // This isnt the most advanced option I just want to get it working
  chosenOptionIndex = Math.floor(Math.random() * totalOptions + 1); // The maximum is inclusive and the minimum is inclusive

  // This determines if the number generated was an item
  if (chosenOptionIndex > enemyPowerOptions + enemyWeaponsOptions) {
    chosenOptionIndex =
      chosenOptionIndex - (enemyPowerOptions + enemyWeaponsOptions);
    chosenTypeIndex = 3;
    console.log(enemy.information.name, " uses item ", chosenOptionIndex);
  }
  // This determines if the number generated was a power
  else if (chosenOptionIndex > enemyWeaponsOptions) {
    chosenOptionIndex -= enemyWeaponsOptions;
    chosenTypeIndex = 2;
    console.log(
      enemy.information.name,
      " casts with power ",
      chosenOptionIndex
    );
  } else {
    console.log(enemy.information.name, " attacks with ", chosenOptionIndex);
  }

  // Need to subtract 1 to return an array index
  chosenOptionIndex -= 1;

  return { chosenTypeIndex, chosenOptionIndex };
};

export { enemyTurnTactic };
