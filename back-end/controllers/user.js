// Packages
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
require('dotenv').config();

// Model
const userModel = require('../models/user_model');
const users = userModel.User;

// Json web token
const jwt = require('jsonwebtoken');

// Create new user
const createUser = async (req, res) => {
    try {
        // Check if all inputs are valid
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const { username, email, password } = req.body;

        // Hashing the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save new user to the database
        const newUser = new users({
            username,
            email,
            password,
            passwordHash,
            resetPasswordToken: undefined,
            resetPasswordExpire: undefined
        });

        const savedUser = await newUser.save();

        // Log the user in
        const token = jwt.sign(
            {
                user: savedUser._id
            },
            process.env.JWT_SECRET_KEY
        );

        // Send the token to the user
        res
            .cookie('token', token, {
                httpOnly: true
            })
            .send();
        
    } catch (error) {
        res.status(500).send();
    }
}

// Login
const loginUser = async (req, res) => {
    try {
        // Check if all inputs are valid
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }
        const { email } = req.body;

        // Find user
        const existingUser = await users.findOne({email});
        
        // Sign token
        const token = jwt.sign(
            {
                user: existingUser._id
            },
            process.env.JWT_SECRET_KEY
        );

        // Send the token to the user
        res
            .cookie('token', token, {
                httpOnly: true
            })
            .send();
    } catch (error) {
        res.status(500).send();
    }
}

// Logout
const logoutUser = async (req, res) => {
    res
        .cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        .send();
}

// Check if user is logged in
const checkLoggedIn = async (req, res) => {
    try {
        const token = req.cookies.token;
        console.log(token);
        // Check if token exists
        if(!token){
            return res.json(false);
        };

        // Validate token
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.send(true);
    } catch (error) {
        res.json(false);
    }
}

module.exports = { createUser, loginUser, logoutUser, checkLoggedIn };