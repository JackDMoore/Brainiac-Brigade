import React from "react";
import userEvent from "@testing-library/user-event";

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react"; 

import CalendarPage from ".";

describe("Calendar Page", () => {
  beforeEach(() => {
    render(<CalendarPage />)
  })

  afterEach(() => {
    cleanup();
  })

  it("Displays a heading with appropriate text", () => {
    const heading = screen.getByRole("heading");
    expect(heading).toBeInDocument();
    expect(heading.textContent).toBe("Calendar")
  })

  it("Displays a calendar", () => {
    const calendar = screen.getByRole("Calendar");
    expect(calendar).toBeInTheDocument();
  })

})



// tests:
// Calendar render
// Calendar days are links
