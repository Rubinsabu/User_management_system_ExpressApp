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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="backdrop-blur-md bg-white/70 border border-gray-200 p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6"> Create Admin Account </h2>
      <form onSubmit={handleRegister} className="space-y-4">
        
        <input placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}} required className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
        <input type='password' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition">Sign Up</button>
      </form>
    </div>
    </div>
  )
}

export default AdminSignUp
