require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const articleRoutes = require('./routes/articleRoutes'); // Article routes
const userRoutes = require('./routes/userRoutes');     // User routes (for future auth)
const commentRoutes = require('./routes/commentRoutes');   // Comment routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // For older versions, if using unique indexes
    // useFindAndModify: false, // For older versions, if using findOneAndUpdate
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes); // For future user authentication
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
    res.send('Blog Platform Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});