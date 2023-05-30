import React, { useState } from 'react'


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleUsername(e) {
    // e.preventDefault()
    setUsername(e.target.value)
    
  }

  function handlePassword(e) {
    setPassword(e.target.value)
    
  }

  function gatherDetails(e){
    e.preventDefault()
    console.log(username)
    console.log(password)
  }


  return (
    <>
    

    <form className='input-container'>
        
        <p>Username: </p>
        <input type='text' aria-label='username input' placeholder='Enter Username' onChange={handleUsername} value={username}></input>
        <p>Password: </p>
        <input type='text' aria-label='password input' placeholder='Enter Password' onChange={handlePassword} value={password}></input><br/>
        <input type='submit' onClick={gatherDetails}></input>
    </form>
    </>
  )
}

export default Login