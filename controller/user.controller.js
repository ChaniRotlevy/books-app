const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({ username, email, password });
        const token = generateToken(newUser);
        res.status(201).json({ message: "Registered successfully", user: newUser, token });
    } catch (error) {
        if (error.code === 11000) {
            error.status = 409;
            error.message = 'האימייל כבר קיים במערכת';
        }
        next(error);
    }
};

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user);
        res.json({ message: "Signed in successfully", user, token });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error('המשתמש לא נמצא');
            error.status = 404;
            return next(error);
        }
        const { username, email, password } = req.body;
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password;
        await user.save();
        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllUsers, signUp, signIn, updateUser };