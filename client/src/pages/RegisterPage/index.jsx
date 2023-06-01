import React from 'react'
import { Register } from '../../components'


const RegisterPage = () => {

      return (
        <>
            <h1>Register Page</h1>
            <Register/>
            <p>Already registered? <a href='/login'  style={{color: "#FF8E3C"}}>Login here</a></p>
        </>
      )
}
export default RegisterPage
