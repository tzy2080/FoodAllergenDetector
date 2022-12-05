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