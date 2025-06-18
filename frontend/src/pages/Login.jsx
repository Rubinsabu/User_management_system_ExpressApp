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
    <div>
      <form onSubmit={handleLogin}>
            <h2>Admin Login</h2>
            <input placeholder='Username' value={username} onChange={(e)=> setUsername(e.target.value)} required/>
            <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <button type='submit'>Login</button>
            <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
           </p>
      </form>
    </div>
  )
}

export default Login
