import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import PageWrapper from '../PageWrapper';

describe("PageWrapper", () => {
    beforeEach(() => {
        render(
          <MemoryRouter>
            <PageWrapper />
          </MemoryRouter>
        );
      });
    
      afterEach(() => {
        cleanup();
      });

    it("renders Home", () => {
        const home = screen.getByRole('link', {name: /Home/i}) 
        expect(home).toBeInTheDocument()
    })

    it("renders login/sign up", () => {
        const login = screen.getByRole('link', {
            name: /Login/i
        })
        expect(login).toBeTruthy()
    })

    it("renders calender", () => {
        const calender = screen.getByRole('link',{
            name: /Calendar/i
        })
        expect(calender).toBeInTheDocument()
    })
})
