import React, { useState } from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

function Auth() {
  return (
    <div className='auth'>
      <Login/>
      <Register/>
    </div>
  )
}

export default Auth


const Login = () =>{
    const [username, setUsername] =useState("")
    const [password, setPassword] =useState("")

    const [_, setCookies] = useCookies(["access_token"])

    const navigate = useNavigate()  

    const onsubmit = async (event)=>{
       event.preventDefault()
       try {
        //response will receive the res
        const response =  await axios.post("http://localhost:8000/auth/login", {
           
        username,
        password
       })
      setCookies("access_token", response.data.token)
      window.localStorage.setItem("userID", response.data.userID)
      navigate("/")
       } catch (error) {
        console.log(error)
        alert("invalid user")
        
       }
    } 

    return (
        <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"Login"} onsubmit={onsubmit} />
    )
    
}

const Register = () =>{
    const [username, setUsername] =useState("")
    const [password, setPassword] =useState("")

    const onsubmit = async (event) =>{
        event.preventDefault()
        const userr ={username, password}
        try {
           await axios.post("http://localhost:8000/auth/register", {
           
            username,
            password
           })
         // await fetch("http://localhost:8000/auth/register",{
          //  method:"POST",
           // body: JSON.stringify(userr),
           // headers:{
          //      "Content-Type":"application/json",
           // },
         // })
           alert("Registrarion completed now login")
        }catch(err){
            console.log("error",err);

        }

    }

    return (
       <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"Register"} onsubmit={onsubmit} />
    )
    
}

const Form = ({username, setUsername, password, setPassword, label, onsubmit}) =>{
    return(
        <div>
        <form onSubmit={onsubmit} >
            <h2 style={{"textAlign":'center'}} >{label}</h2>
            <div style={{"textAlign":"center", "display":'grid'}}>
                <label htmlFor="username">Username</label>
                <input style={{"width":"500px","marginLeft":"500px","marginTop":'30px'}} type="text" id='username' value={username} onChange={(event)=>setUsername(event.target.value)} />
            </div>
            <div style={{"textAlign":"center",'marginTop':'30px',"display":'grid'}}>
                <label htmlFor="password">Pssword</label>
                <input style={{"marginLeft":"500px","marginTop":'30px','width':"500px"}} type="password" id='password' value={password} onChange={(event)=>setPassword(event.target.value)} />
            </div>
            <button style={{"marginLeft":"730px","marginTop":"50px","background":"blue","color":"white","width":"100px","height":"40px","border":"none","borderRadius":"20px"}} type='submit'>{label}</button>
        </form>
    </div>
    )

}
