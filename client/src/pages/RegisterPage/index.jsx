import React from 'react'
import { Login } from '../../components'


const RegisterPage = () => {
    function CallBack(user,pass){
        console.log("user: ",user)
        console.log("pass: ",pass)
        
      }
      return (
        <>
            <h1>Register Page</h1>
            <Login callback={CallBack}/>
        </>
      )
}
export default RegisterPage
