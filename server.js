// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));