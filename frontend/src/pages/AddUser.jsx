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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-700 p-8 rounded-xl shadow-2xl space-y-6 text-white">
        <h2 className="text-2xl font-bold text-center">Add New User</h2>
        <input placeholder='Name' onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
        <input placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
        <input placeholder="Username" onChange={e => setFormData({ ...formData, username: e.target.value })} required className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
        <div className="w-full">
        <label
          htmlFor="photo"
          className="block w-full text-center cursor-pointer px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md shadow-md transition"
          >
        Upload Profile Photo
          </label>
          <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
              className="hidden"
          />
          {formData.photo && (
            <p className="mt-2 text-sm text-gray-300 truncate">{formData.photo.name}</p>
          )}

      </div>
        <button type='submit' className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded transition">Add</button>
      </form>
    </div>
  )
}

export default AddUser
