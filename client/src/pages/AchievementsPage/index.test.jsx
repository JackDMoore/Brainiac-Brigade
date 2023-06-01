import React from "react";

import HomePage from "../AchievementsPage";

// import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("Achievements Page", () => {
  beforeEach(() => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Displays a heading with text: Achievements", () => {
    const heading = screen.getByText("Achievements");
    expect(heading).toBeInTheDocument();
  });

  it("Displays a button with appropriate text", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe("Toggle") 
  })

});