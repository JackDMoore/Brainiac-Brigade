import React from 'react'

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
      const response = await axios.post("http://localhost:3000/users/login", options)
      console.log(response) 
      if (response.status == 200) {
        localStorage.setItem("token",response.data.token)
      } 
      } catch (error) {
          alert(error.response.data.error)
      }
    }
  
  
    return (
      <>
      
  
      <form className='input-container'>
          
          <p>Username: </p>
          <input type='text' aria-label='username input' placeholder='Enter Username' onChange={handleUsername} value={username}></input>
          <p>Password: </p>
          <input type='password' aria-label='password input' placeholder='Enter Password' onChange={handlePassword} value={password}></input><br/>
          <input type='submit' onClick={gatherDetails}></input>
      </form>
      </>
    )
}

export default Register
