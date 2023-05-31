import React from 'react'
import { Login } from '../../components'

const LoginPage = () => {
 

  return (
    <>
        <h1>Login Page</h1>
        <Login/>
        <p>Not registered? <a href='/register'>Register</a></p>
    </>
  )
}

export default LoginPage
