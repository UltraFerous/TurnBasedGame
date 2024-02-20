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
  rollXDiceD3,
  filterDicePoolAbove,
  filterDicePoolBelow,
  woundComparison,
  roll2D6Dice,
} from "../helpers/diceRolls";
import Combat from "../components/Combat";
import { enemyTurnTactic } from "../helpers/enemyAI";
import { PlayerContextProvider } from "../context/playerContext";
import { EnemyContextProvider } from "../context/enemyContext";

test("test", () => {
  expect(true).toBe(true);
});

describe("Attack Buttons", () => {
  test("renders both attack buttons", () => {
    render(
      <>
        <PlayerContextProvider>
          <EnemyContextProvider>
            <Combat />
          </EnemyContextProvider>
        </PlayerContextProvider>
      </>
    );
    // Query the button using a more specific query
    const firstAttackButton = screen.getAllByRole("button", {
      text: "/Attack/i)",
    })[0];
    // Assert that the button is defined or present in the document
    expect(firstAttackButton).toBeDefined();
  });

  test("clicks", () => {
    render(
      <>
        <PlayerContextProvider>
          <EnemyContextProvider>
            <Combat />
          </EnemyContextProvider>
        </PlayerContextProvider>
      </>
    );

    const firstAttackButton = screen.getAllByRole("button", {
      text: "/Attack/i",
    })[1];
    fireEvent.click(firstAttackButton);
  });

  test("Combat ends screen is working", () => {
    render(
      <>
        <PlayerContextProvider>
          <EnemyContextProvider>
            <Combat />
          </EnemyContextProvider>
        </PlayerContextProvider>
      </>
    );

    const firstAttackButton = screen.getAllByRole("button", {
      text: "/Attack/i",
    })[1];

    for (let i = 0; i < 20; i++) {
      fireEvent.click(firstAttackButton);
    }

    const endScreenText = screen.getByText(/Battle Over!/i);
    expect(endScreenText).toBeInTheDocument();
    expect(firstAttackButton).not.toBeInTheDocument();
  });
});

describe("Dice Rolling", () => {
  test("D6 Rolls Proper Amount of Dice", () => {
    const testDiceRoll = rollXDice(10);
    expect(testDiceRoll.length).toBe(10);
  });
  test("D6 Rolls Number Between 1 and 6", () => {
    for (let i = 0; i < 50; i++) {
      let testDiceRoll = rollXDice(1)[0];
      expect(testDiceRoll).toBeLessThan(7);
      expect(testDiceRoll).toBeGreaterThan(0);
    }
  });
  test("D3 Rolls Number Between 1 and 3", () => {
    for (let i = 0; i < 50; i++) {
      let testDiceRoll = rollXDiceD3(1)[0];
      expect(testDiceRoll).toBeLessThan(4);
      expect(testDiceRoll).toBeGreaterThan(0);
    }
  });
  test("2D6 Rolls Number Between 2 and 12", () => {
    for (let i = 0; i < 50; i++) {
      let testDiceRoll = roll2D6Dice();
      expect(testDiceRoll).toBeLessThan(13);
      expect(testDiceRoll).toBeGreaterThan(1);
    }
  });
});

describe("Dice Filtering", () => {
  test("The above filter removes the correct dice", () => {
    const testRolls = [1, 2, 3, 4, 5, 6];
    const filteredRoll = filterDicePoolAbove(testRolls, 3);
    expect(filteredRoll.length).toEqual(4);
  });
  test("The above filter removes the correct dice", () => {
    const testRolls = [1, 2, 3, 4, 5, 6];
    const filteredRoll = filterDicePoolAbove(testRolls, 6);
    expect(filteredRoll.length).toEqual(1);
  });
  test("The below filter removes the correct dice", () => {
    const testRolls = [1, 2, 3, 4, 5, 6];
    const filteredRoll = filterDicePoolBelow(testRolls, 3);
    expect(filteredRoll.length).toEqual(2);
  });
  test("A roll of a 6 is always a success", () => {
    const testRolls = [1, 2, 3, 4, 5, 6];
    const filteredRoll = filterDicePoolAbove(testRolls, 7);
    expect(filteredRoll.length).toEqual(1);
  });
  test("A roll of a 1 is always always a fail", () => {
    const testRolls = [1, 2, 3, 4, 5, 6];
    const filteredRoll = filterDicePoolBelow(testRolls, 6);
    expect(filteredRoll.length).toEqual(5);
  });
});

describe("Wound Comparison", () => {
  test("The Equals Condition", () => {
    const comparisonResult = woundComparison(4, 4);
    expect(comparisonResult).toEqual(4);
  });
  test("The Greater Than Condition", () => {
    const comparisonResult = woundComparison(6, 4);
    expect(comparisonResult).toEqual(3);
  });
  test("The Double Condition", () => {
    const comparisonResult = woundComparison(8, 4);
    expect(comparisonResult).toEqual(2);
  });
  test("The Less Than Condition", () => {
    const comparisonResult = woundComparison(3, 4);
    expect(comparisonResult).toEqual(5);
  });
  test("The Half Condition", () => {
    const comparisonResult = woundComparison(2, 4);
    expect(comparisonResult).toEqual(6);
  });
  test("The Half Condition Exaggerated", () => {
    const comparisonResult = woundComparison(1, 4);
    expect(comparisonResult).toEqual(6);
  });
  test("The Double Condition Exaggerated", () => {
    const comparisonResult = woundComparison(14, 4);
    expect(comparisonResult).toEqual(2);
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
      let testTactic = enemyTurnTactic(testStats, testStats);
      expect(testTactic.chosenTypeIndex).toBeGreaterThanOrEqual(1);
      expect(testTactic.chosenTypeIndex).toBeLessThanOrEqual(2);
      expect(testTactic.chosenOptionIndex).toBe(0);
    }
  });
  test("Generates proper numbers with 1 attack, 1 power and 1 power", () => {
    for (let i = 0; i < 50; i++) {
      let testTactic = enemyTurnTactic(testStats, testStats);
      expect(testTactic.chosenTypeIndex).toBeGreaterThanOrEqual(1);
      expect(testTactic.chosenTypeIndex).toBeLessThanOrEqual(3);
      expect(testTactic.chosenOptionIndex).toBe(0);
    }
  });
});
