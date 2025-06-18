const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { PORT, MONGO_URI } = require('./config');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(MONGO_URI)
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error',err))

app.use('/api',authRoutes);
app.use('/api',userRoutes);

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));