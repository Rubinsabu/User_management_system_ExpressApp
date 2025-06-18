import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import API from '../api';

const Dashboard = () => {

    const [users,setUsers]= useState([]);
    const navigate = useNavigate();

    const fetchUsers = async()=>{
        const res = await API.get('/users');
        setUsers(res.data);
    }

    const handleDelete = async(id)=>{
        await API.delete(`/users/${id}`);
        fetchUsers();
    }

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };

    useEffect(()=>{fetchUsers();},[]);

  return (
    <div>
      <h2>User List</h2>
      <button><Link to='/add-user'>Add User</Link></button>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {users.map(user => (
        <li key={user._id}>
            <img src={`http://localhost:5000/uploads/${user.photo}`} width="50"></img>
            {user.name} ({user.email})
            <Link to={`/edit-user/${user._id}`}>Edit User</Link>
            <button onClick={()=> handleDelete(user._id)}>Delete</button>
        </li>))}
      </ul>
    </div>
  )
}

export default Dashboard
