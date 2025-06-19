import React,{useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Login = () => {

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e) =>{

        e.preventDefault();
        try{
            const res = await API.post('/login',{username, password});
            localStorage.setItem('token',res.data.token);
            navigate('/');
        }catch(err){
            alert('Login failed');
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <form onSubmit={handleLogin}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
            <input placeholder='Username' value={username} onChange={(e)=> setUsername(e.target.value)} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            <button type='submit' className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Login</button>
            <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '} 
            <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
           </p>
      </form>
    </div>
  )
}

export default Login
