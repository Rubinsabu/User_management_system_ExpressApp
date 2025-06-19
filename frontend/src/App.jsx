import { Routes,Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import AdminSignUp from "./pages/AdminSignUp";

function App() {
  const isLoggedIn = localStorage.getItem('token');
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<AdminSignUp />} />
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace/>} />
        <Route path="/add-user" element={<AddUser />} replace/>
        <Route path="/edit-user/:id" element={<EditUser />} replace/>
      </Routes>
    </>
  )
}

export default App
