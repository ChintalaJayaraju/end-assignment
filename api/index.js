const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const docsRoutes = require('./routes/docsRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err.message));
} else {
  console.log('Warning: MONGO_URI not set.');
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/docs', docsRoutes);

// ✅ Local development (nodemon) vs Vercel serverless
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
}

module.exports = serverless(app);
