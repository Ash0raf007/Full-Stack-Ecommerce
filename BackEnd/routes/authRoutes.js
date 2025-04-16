// routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ first_name, last_name, email, password: hashedPassword, role: 'user' });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser.email });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: foundUser._id, email: foundUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: foundUser._id, email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        const role = foundUser.role;
        
        res.json({ message: 'Login successful', token, refreshToken, user: foundUser.email, role });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

export default router;
