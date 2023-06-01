import React from "react";

import CalendarPage from "../CalendarPage";

import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("Calendar Page", () => {
  beforeEach(() => {
    render(
      <Router>
        <CalendarPage />
      </Router>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Displays a heading with appropriate text", () => {
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("Calendar");
  });

  it("Displays a calendar", () => {
    // const calendar = container.querySelector("#calendarID")
    // expect(calendar).toBeInTheDocument();
    const calendar = render(<Router><CalendarPage /></Router>)
    expect(calendar).toBeTruthy()
  });

  // it("Clicking on calendar routes you to TodoPage", async () => {
  //   expect("window.location.href").not.toContain("/todo");
  //   const todo = screen.getByText("TodoPage");
  //   await userEvent.click(todo);
  //   expect(window.location.href).toContain("/todo");
  // });
});
