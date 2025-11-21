// 1. Import required modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// Serve uploads folder for resume files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// 4. Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 5. Import and Use Routes
const candidateRoutes = require('./src/routes/candidateRoutes');
app.use('/api/candidates', candidateRoutes);

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
