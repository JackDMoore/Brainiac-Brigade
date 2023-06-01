import React from 'react';
import { expect, it, expect as vitestExpect, afterEach, beforeEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import UrgentPage from '../UrgentPage';

beforeEach(() => {
  render(
    <Router>
      <UrgentPage tasks={[]} />
    </Router>
  );
});

afterEach(() => {
  cleanup();
});


it('renders the heading', () => {
  const headingElement = screen.getByText('Urgent Tasks');
  vitestExpect(headingElement).toBeTruthy();
});

it('renders the color codes section', () => {
  const colorCodesElement = screen.getByText('Color Codes');
  vitestExpect(colorCodesElement).toBeTruthy();
});

it('renders the task list', () => {
  const taskListElement = screen.getByTestId('task-list');
  vitestExpect(taskListElement).toBeTruthy();
});

it('renders the UrgentPage component with the correct className', () => {
    const urgentPageElement = screen.getByTestId('urgent-page');
    vitestExpect(urgentPageElement).toHaveClass('urgent-page');
  });
