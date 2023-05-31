import React from 'react'
import { Login } from '../../components'

const LoginPage = () => {
  

  function CallBack(user,pass){
    console.log("user: ",user)
    console.log("pass: ",pass)
    
  }
  return (
    <>
        <h1>Login Page</h1>
        <Login callback={CallBack}/>
    </>
  )
}

export default LoginPage
