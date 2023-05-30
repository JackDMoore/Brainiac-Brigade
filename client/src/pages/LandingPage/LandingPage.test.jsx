import React from 'react';
import { expect, it, expect as vitestExpect, afterEach, beforeEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import LandingPage from '../LandingPage';

beforeEach(() => {
  render(
    <Router>
      <LandingPage />
    </Router>
  );
});

afterEach(() => {
  cleanup();
});

it('renders LandingPage with Start Now link', () => {
  const link = screen.getByRole('link', { name: /Start Now/i });
  vitestExpect(link).toBeTruthy();
});

it('does not reveal About Us section initially', () => {
  const aboutSection = screen.queryByRole('section', { name: 'About Us' });
  vitestExpect(aboutSection).toBeNull();
});
