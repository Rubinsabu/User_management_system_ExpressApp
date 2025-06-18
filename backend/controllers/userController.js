const User = require('../models/User');

const createUser = async (req, res) => {
  const { name, email, username } = req.body;
  const photo = req.file?.filename;
  try {
    const user = new User({ name, email, username, photo });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
  };

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  };

const updateUser = async (req, res) => {
    const updates = req.body;
    if (req.file) updates.photo = req.file.filename;
    try {
      const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error updating user' });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user' });
    }
  };

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}