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
      navigate('/login',{ replace: true });
    };

    useEffect(()=>{fetchUsers();},[]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-5xl mx-auto mb-8 gap-4 sm:gap-0">
      <div>
      <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      <h3 className="text-lg font-medium text-gray-600 mt-7 ml-110">Users List</h3>
      </div>
      <div className="space-x-4">
      <Link to='/add-user' className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
      Add User</Link>
      <button onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
        Logout</button>
      </div>
      </div>
      <div >
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {users.map(user => (
        <li key={user._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center">
            <img src={`http://localhost:5000/uploads/${user.photo}`} className="w-24 h-24 rounded-full object-cover mb-4 border"></img>
            <h3 className="text-lg font-semibold">{user.name} </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400">@{user.username}</p>
            <div className="mt-4 space-x-2">
            <Link to={`/edit-user/${user._id}`} className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500 transition">
            Edit User</Link>
            <button onClick={()=> handleDelete(user._id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition">
              Delete</button>
            </div>
        </li>))}
      </ul>
    </div>
    </div>
  )
}

export default Dashboard
