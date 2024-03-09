import { describe, expect, test } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import {
  rollXDice,
  filterDicePoolAbove,
  filterDicePoolBelow,
  diceComparison,
} from "../helpers/diceRolls";
import Combat from "../components/Combat";
import { enemyTurnTactic } from "../helpers/enemyAI";
import { PlayerContextProvider } from "../context/playerContext";
import { EnemyContextProvider } from "../context/enemyContext";

test("test", () => {
  expect(true).toBe(true);
});

// describe("Attack Buttons", () => {
//   test("renders both attack buttons", () => {
//     render(
//       <>
//         <PlayerContextProvider>
//           <EnemyContextProvider>
//             <Combat />
//           </EnemyContextProvider>
//         </PlayerContextProvider>
//       </>
//     );
//     // Query the button using a more specific query
//     const firstAttackButton = screen.getAllByRole("button", {
//       text: "/Attack/i)",
//     })[0];
//     // Assert that the button is defined or present in the document
//     expect(firstAttackButton).toBeDefined();
//   });

// test("clicks", () => {
//   render(
//     <>
//       <PlayerContextProvider>
//         <EnemyContextProvider>
//           <Combat />
//         </EnemyContextProvider>
//       </PlayerContextProvider>
//     </>
//   );

//   const firstAttackButton = screen.getAllByRole("button", {
//     text: "/Attack/i",
//   })[1];
//   fireEvent.click(firstAttackButton);
// });

// test("Combat ends screen is working", () => {
//   render(
//     <>
//       <PlayerContextProvider>
//         <EnemyContextProvider>
//           <Combat />
//         </EnemyContextProvider>
//       </PlayerContextProvider>
//     </>
//   );

//   const firstAttackButton = screen.getAllByRole("button", {
//     text: "/Attack/i",
//   })[1];

//   for (let i = 0; i < 20; i++) {
//     fireEvent.click(firstAttackButton);
//   }

//   const endScreenText = screen.getByText(/Battle Over!/i);
//   expect(endScreenText).toBeInTheDocument();
//   expect(firstAttackButton).not.toBeInTheDocument();
// });
// });

describe("Dice Rolling", () => {
  test("D10 Rolls Proper Amount of Dice", () => {
    const testDiceRoll = rollXDice(10);
    expect(testDiceRoll.length).toBe(10);
  });
  test("D10 Rolls Number Between 1 and 6", () => {
    for (let i = 0; i < 50; i++) {
      let testDiceRoll = rollXDice(1)[0];
      expect(testDiceRoll).toBeLessThan(11);
      expect(testDiceRoll).toBeGreaterThan(0);
    }
  });
});

describe("Dice Filtering", () => {
  test("The above filter removes the correct dice", () => {
    const testRolls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const filteredRoll = filterDicePoolAbove(testRolls, 6);
    expect(filteredRoll.length).toEqual(5);
  });
  test("The above filter removes the correct dice", () => {
    const testRolls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const filteredRoll = filterDicePoolAbove(testRolls, 6);
    expect(filteredRoll.length).toEqual(5);
  });
  test("A roll of a 10 is always a success", () => {
    const testRolls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const filteredRoll = filterDicePoolAbove(testRolls, 11);
    expect(filteredRoll.length).toEqual(1);
  });
  test("A roll of a 1 is always always a fail", () => {
    const testRolls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const filteredRoll = filterDicePoolBelow(testRolls, 0);
    expect(filteredRoll.length).toEqual(1);
  });
});

describe("Wound Comparison", () => {
  test("The Equals Condition", () => {
    const comparisonResult = diceComparison(5, 5);
    expect(comparisonResult).toEqual(6);
  });
  test("The Greater Than Conditions", () => {
    let comparisonResult = diceComparison(6, 5);
    expect(comparisonResult).toEqual(5);
    comparisonResult = diceComparison(7, 5);
    expect(comparisonResult).toEqual(4);
    comparisonResult = diceComparison(8, 5);
    expect(comparisonResult).toEqual(3);
    comparisonResult = diceComparison(9, 5);
    expect(comparisonResult).toEqual(2);
    comparisonResult = diceComparison(10, 5);
    expect(comparisonResult).toEqual(1);
  });
  test("The Less Than Conditions", () => {
    let comparisonResult = diceComparison(4, 5);
    expect(comparisonResult).toEqual(7);
    comparisonResult = diceComparison(3, 5);
    expect(comparisonResult).toEqual(8);
    comparisonResult = diceComparison(2, 5);
    expect(comparisonResult).toEqual(9);
    comparisonResult = diceComparison(1, 5);
    expect(comparisonResult).toEqual(10);
    comparisonResult = diceComparison(0, 5);
    expect(comparisonResult).toEqual(10);
  });
});

describe("Enemy Tactic Generation", () => {
  const testStats = {
    information: {
      name: "TEST",
    },
    weapons: [{}],
    powers: [],
    items: [],
  };

  const testStatsTwo = {
    information: {
      name: "TEST",
    },
    weapons: [{}],
    powers: [{}],
    items: [],
  };

  const testStatsThree = {
    information: {
      name: "TEST",
    },
    weapons: [{}],
    powers: [{}],
    items: [{}],
  };
  test("Generates proper numbers with only 1 attack", () => {
    for (let i = 0; i < 50; i++) {
      let testTactic = enemyTurnTactic(testStats, testStats);
      expect(testTactic.chosenTypeIndex).toBe(1);
      expect(testTactic.chosenOptionIndex).toBe(0);
    }
  });
  test("Generates proper numbers with 1 attack and 1 power", () => {
    for (let i = 0; i < 50; i++) {
      let testTactic = enemyTurnTactic(testStatsTwo, testStatsTwo);
      expect(testTactic.chosenTypeIndex).toBeGreaterThanOrEqual(1);
      expect(testTactic.chosenTypeIndex).toBeLessThanOrEqual(2);
      expect(testTactic.chosenOptionIndex).toBe(0);
    }
  });
  test("Generates proper numbers with 1 attack, 1 power and 1 power", () => {
    for (let i = 0; i < 50; i++) {
      let testTactic = enemyTurnTactic(testStatsThree, testStatsThree);
      expect(testTactic.chosenTypeIndex).toBeGreaterThanOrEqual(1);
      expect(testTactic.chosenTypeIndex).toBeLessThanOrEqual(3);
      expect(testTactic.chosenOptionIndex).toBe(0);
    }
  });
});
