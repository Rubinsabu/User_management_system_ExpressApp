import React, { useState } from 'react'
import API from '../api';
import { useNavigate } from 'react-router-dom';

const AdminSignUp = () => {

    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate = useNavigate();

   const handleRegister = async(e)=>{
    e.preventDefault();
    try{
        await API.post('/register',{username, password});
        alert('Admin registered successfully');
        navigate('/login');
    }catch(err){
        alert('User SignUp Failed !!')
    }
   } 

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h2>Admin Sign Up</h2>
        <input placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>
        <input type='password' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default AdminSignUp
