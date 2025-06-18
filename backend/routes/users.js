const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer')
const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
  } = require('../controllers/userController');

  router.post('/users',authMiddleware,upload.single('photo'),createUser);
  router.get('/users',authMiddleware, getUsers);
  router.get('/users/:id', authMiddleware, getUser);
  router.put('/users/:id', authMiddleware, upload.single('photo'), updateUser);
  router.delete('/users/:id', authMiddleware, deleteUser);

module.exports = router;