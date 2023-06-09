import React from "react";

import HomePage from "../HomePage";

import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("Home Page", () => {
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

  it("Displays a heading with text: Welcome to the Homepage!", () => {
    const heading = screen.getByText("Welcome to the Homepage!");
    expect(heading).toBeInTheDocument();
  });

  it("Displays a heading with text: Urgent Tasks", () => {
    const heading = screen.getByText("Urgent Tasks");
    expect(heading).toBeInTheDocument();
  });

  it("Displays a paragraph with text: Click here to view urgent tasks.", () => {
    const heading = screen.getByText("Click here to view urgent tasks.");
    expect(heading).toBeInTheDocument();
  });

  it("Displays a heading with text: Calendar", () => {
    const heading = screen.getByText("Calendar");
    expect(heading).toBeInTheDocument();
  });

  it("Displays a paragraph with text: Click here to view the calendar.", () => {
    const heading = screen.getByText("Click here to view the calendar.");
    expect(heading).toBeInTheDocument();
  });

  it("Displays a heading with text: Achievements", () => {
    const heading = screen.getByText("Achievements");
    expect(heading).toBeInTheDocument();
  });

  it("Displays a paragraph with text: Click here to view your achievements.", () => {
    const heading = screen.getByText("Click here to view your achievements.");
    expect(heading).toBeInTheDocument();
  });

  it("Changes location when a Link is clicked", async () => {
    expect("window.location.href").not.toContain("/urgent")
    const link = screen.getAllByRole("link")
    await userEvent.click(link)
    expect(window.location.href).toContain("/urgent")
})

});
