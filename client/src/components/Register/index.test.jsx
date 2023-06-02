import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import axios from "axios"

import Register from '.';

describe("Register Component", () =>{
    beforeEach(() => {
        render (
            <MemoryRouter>
                <Register/>
            </MemoryRouter>
        )
    })

    afterEach(() => {
        cleanup()
    })

    it("Username changes state when input value changes", () => {
        //grabs input for username via aria-label
        const usernameInput = screen.getByLabelText("username input")
        //simulate event change in input field.
        //fireEvent.change(getByLabelText(/username/i), {target: {value: 'a'}})
        fireEvent.change(usernameInput, {target: {value: "Panda"}})
        expect(usernameInput.value).toEqual("Panda")
    })

    it("Password changes state when the input value changes", ()  => {
        const passwordInput = screen.getByLabelText("password input")
        fireEvent.change(passwordInput, {target: {value: "areCool"}})
        expect(passwordInput.value).toEqual("areCool")
    })

    it("is gatherDetails called after submit is clicked", () => {
        vi.spyOn(axios, "post")

        const submitButton = screen.getByLabelText("submit button")
        submitButton.click()

        expect(axios.post).toHaveBeenCalled()

    })

    it("is api called with button click?", () => {
        const axiosspy= vi.spyOn(axios, "post")

        const submitButton = screen.getByLabelText("submit button")
        submitButton.click()

        expect(axiosspy).toHaveBeenCalledWith("https://brainiac-api.onrender.com/users",expect.any(Object))
    })

    // it("Is there a local token after logging in?")

})
