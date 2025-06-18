import React, { useEffect, useState } from 'react'
import API from '../api'
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const {id} = useParams();
  const [formData, setFormData]= useState({name:'', email:'', username:'', photo: null});
  const navigate = useNavigate();
  
  useEffect(()=>{
    const fetchUser = async()=>{
        const res = await API.get(`/users/${id}`);
        setFormData({...res.data,photo:null});
    }
    fetchUser();
  },[id]);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => val && data.append(key, val));
    await API.put(`/users/${id}`, data);
    navigate('/');
  }

  return (
    <div>
       <form onSubmit={handleSubmit}>
            <h2>Edit User</h2>
            <input value={formData.name} onChange={e => setFormData({...formData,name: e.target.value})} required/>
            <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            <input value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} required />
            <input type='file' onChange={e => setFormData({...formData,photo: e.target.files[0]})}/>
            <button type='submit'>Update</button>
       </form>
    </div>
  )
}

export default EditUser
