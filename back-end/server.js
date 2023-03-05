// Packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Express
const app = express();
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routing 
const userRoute = require('./routes/user');
const allergenRoute = require('./routes/allergen');
app.use('/user', userRoute);
app.use('/allergen', allergenRoute);

// In practice, the only reason to leave in commented code is because the change is expected to be temporary
// Otherwise, we'd remove it. If we want it back, there's the commit history. 
// Tip: Make a change here then use Git Lens with vscode to see the commit history. It's like a time machine 
// Update allergen list database
// const getAllergens = require('./retrieveAllergen');
// getAllergens();

// Server
mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
    .then(() => {
        app.listen(5000, () => {
            console.log('Connected to database and server');
        })
    }) 
    .catch((error) => {
        console.log(error);
    })