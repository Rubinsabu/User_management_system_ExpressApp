import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const AddUser = () => {

  const [formData, setFormData]=useState({name:'',email:'',username:'',photo:null});
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{

    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key,val])=> data.append(key,val));
    await API.post('/users', data);
    navigate('/');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add User</h2>
        <input placeholder='Name' onChange={e => setFormData({...formData, name: e.target.value})} required/>
        <input placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} required />
        <input placeholder="Username" onChange={e => setFormData({ ...formData, username: e.target.value })} required />
        <input type="file" onChange={e => setFormData({ ...formData, photo: e.target.files[0] })} />
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddUser
