// should be inside rest-api/server.js
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) =>
        console.error("MongoDB connection error:", err));

const express = require('express');
const cors = require('cors');
const flightsRouter = require('./routes/flights.js');

const app = express();
app.use(cookieParser());
// 1.
// app.use(cors());

// 2.
app.use(cors(
    { 
        origin: 'http://localhost:5173',
        credentials: true
    }
));

// 3.
//app.use(cors({ origin: 'https://<your-vercel-app>.vercel.app', credentials: true }));

app.use(express.json());
app.use('/flights', flightsRouter);

// authentication
const authRoutes = require('./routes/auth.js');
app.use('/api/auth', authRoutes);


app.listen(4000, () => {
    console.log('REST API running at http://localhost:4000');
});