const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { JWT_SECRET } = require('../config');

const register = async(req,res)=>{
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try {
        const admin = new Admin({ username, password: hashedPassword });
        await admin.save();
        res.json({ message: 'Admin registered successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error registering admin' });
      }
}

const login = async(req,res)=>{
    const {username, password} = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id }, JWT_SECRET);
        res.json({ token });
      } catch (err) {
        res.status(500).json({ message: 'Login error' });
      }
}

module.exports={
    register,
    login
}