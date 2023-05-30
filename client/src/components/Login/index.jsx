import React from 'react'

const Login = () => {
  return (
    <>
    <h1>Login Page</h1>

    <form>
        <p>Username: </p>
        <input type='text' aria-label='username input' placeholder='Enter Username'></input>
        <p>Password: </p>
        <input type='text' aria-label='password input' placeholder='Enter Password'></input><br/>
        <input type='submit'></input>
    </form>
    </>
  )
}

export default Login
