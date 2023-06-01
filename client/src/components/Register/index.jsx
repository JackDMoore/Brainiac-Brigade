import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import "../Register/index.css"

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
  
    function handleUsername(e) {
      // e.preventDefault()
      setUsername(e.target.value)
      
    }
  
    function handlePassword(e) {
      setPassword(e.target.value)
      
    }
  
    async function gatherDetails(e){
      e.preventDefault()
      try {
      const options = {"username":username, "password":password}
      const response = await axios.post("https://brainiac-api.onrender.com/users", options)
      console.log(response) 
      if (response.status == 201) {
        alert("User created :)")
        window.location.assign("/login")
        // console.log("I have suceeded")
      } 
      } catch (error) {
          alert(error.response.data.error)
      }
    }
  
  
    return (
      <div className='input-component'>
        <h1>Register Page</h1>
  
      <form className='inputs'>
          
          {/* <p>Username: </p> */}
          
          <input type='text' aria-label='username input' placeholder='Enter Username' onChange={handleUsername} value={username} id='inputField'></input>
          
          {/* <p>Password: </p> */}
          <input type='password' aria-label='password input' placeholder='Enter Password' onChange={handlePassword} value={password} id='inputField'></input><br/>
          <input type='submit' onClick={gatherDetails} id='submitBtn'></input>
          <p>Already registered? <a href='/login'  style={{color: "#ffa600c5"}}>Login here</a></p>
          
      </form>
      </div>
    )
}

export default Register
