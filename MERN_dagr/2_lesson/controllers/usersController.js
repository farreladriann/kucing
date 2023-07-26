const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const User =  require('../models/User');
const Note =  require('../models/Note');
// desc Get all users
// route GET /users
// access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users) {
        return res.status(400).json({ message: 'No users found' });
    }
    res.json(users);
})

// desc Create new users
// route POST /users
// access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;

    // Confirm data
    if (!username || !password || !Array.isArray(roles)/* ngecek apakah roles itu array */ || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // check for duplicates
    const duplicate = await User.findOne({ username });
    if (duplicate) {
        return res.status(409).json({ message: 'username already exist' });
    }
});

// desc Create update users
// route PATCH /users
// access Private
const updateUser = asyncHandler(async (req, res) => {
    
});

// desc Create update users
// route DELTEE /users
// access Private
const deleteUser = asyncHandler(async (req, res) => {
    
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}