const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/articles/:articleId', commentController.createComment); // Create comment for article
router.get('/articles/:articleId', commentController.getCommentsByArticle); // Get comments for article
router.delete('/:commentId', commentController.deleteComment); // Delete comment

module.exports = router;