import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./login.css"

function Login({onLogin}) {
    const [name,setName] = useState("");
    const navigate= useNavigate();

    const handleLogin = () =>{
        if(name.trim()){
            onLogin(name);
            navigate('/chatroom')
        }
    };
  return (
    <div className='container'>
        <h2>Please enter your name to join the chat</h2>
        <input 
            type="text" 
            value = {name}
            onChange={(e)=> setName(e.target.value)}
            placeholder='Enter your name'
        />
        <button onClick={handleLogin}>Join Chat</button>
    </div>
  )
}

export default Login