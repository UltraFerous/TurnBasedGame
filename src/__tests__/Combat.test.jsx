import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import Combat from "../components/Combat";

test("test", () => {
  expect(true).toBe(true);
});

describe("Change Turn Button", () => {
  test("renders", () => {
    render(<Combat />);
    // Query the button using a more specific query
    const changeTurnButton = screen.getByRole("button", {
      text: "Change Turn",
    });
    // Assert that the button is defined or present in the document
    expect(changeTurnButton).toBeDefined();
  });
  test("clicks", () => {
    render(<Combat />);
    const changeTurnButton = screen.getByRole("button", {
      text: "Change Turn",
    });
    fireEvent.click(changeTurnButton);

    // Query for the text content after the click
    const turnText = screen.getByText(/It is turn: 1/i);
    // Assert that the text is present in the document
    expect(turnText).toBeInTheDocument();

    fireEvent.click(changeTurnButton);
    const secondTurnText = screen.getByText(/It is turn: 0/i);
    expect(secondTurnText).toBeInTheDocument();
  });
});
