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
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
       <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-10 rounded-xl shadow-2xl border-t-8 border-blue-600 space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 text-center">Edit User</h2>
            <input value={formData.name} onChange={e => setFormData({...formData,name: e.target.value})} required className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} required className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <div className="w-full">
            <label
            htmlFor="photo"
            className="block text-center cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition"
            >
              Upload New Profile Photo
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
              className="hidden"
            />
            {formData.photo && (
            <p className="mt-2 text-sm text-gray-600 truncate">{formData.photo.name}</p>
              )}
            </div>
            <button type='submit' className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition">Update</button>
       </form>
    </div>
  )
}

export default EditUser
