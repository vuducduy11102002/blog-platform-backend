const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Example route (you'll expand this for auth, profile etc.)
router.get('/profile', userController.getUserProfile); // Line 6 is likely this line

module.exports = router;