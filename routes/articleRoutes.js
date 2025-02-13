const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/', articleController.createArticle); // Create article
router.get('/', articleController.getAllArticles); // Get all articles
router.get('/:id', articleController.getArticleById); // Get article by ID
router.put('/:id', articleController.updateArticle); // Update article
router.delete('/:id', articleController.deleteArticle); // Delete article
router.post('/:id/like', articleController.likeArticle); // Like/Unlike article
router.get('/:id/suggestions', articleController.suggestArticles); // Get suggested articles

module.exports = router;