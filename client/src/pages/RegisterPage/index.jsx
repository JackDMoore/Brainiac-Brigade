import React from 'react'
import { Register } from '../../components'


const RegisterPage = () => {

      return (
        <>
            <h1>Register Page</h1>
            <Register/>
            <p>Already registered? <a href='/login'  style={{color: "#ffa600c5"}}>Login here</a></p>
        </>
      )
}
export default RegisterPage
