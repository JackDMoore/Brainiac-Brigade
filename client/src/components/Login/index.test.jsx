import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import axios from "axios"

import Login from "../Login"

describe("Login Component", () =>{
    beforeEach(() => {
        render (
            <MemoryRouter>
                <Login/>
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

    it("axios should post when submit is clicked", async () => {
        const submit = screen.getByLabelText("submit button")

        const axiosmock = vi.spyOn(axios, "post")
        //spies on axios.post to track usage
        axiosmock.mockResolvedValueOnce({status:200, data: {token: "testing"}})
        //mockresolvedvalueonce, vitest provided method, allows to setup mock response for mock func. Specifies value mock func should return when called
        fireEvent.click(submit)

        await axios(() => {
            expect(axiosmock).toHaveBeenCalledWith("http://localhost:3000/users/login",{username:"", password:""})
        })
        
    })





})
