const Article = require('../models/Article');

// Create a new article
exports.createArticle = async (req, res) => {
    try {
        const newArticle = new Article(req.body); // Assuming req.body contains title, content, etc.
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all articles (with optional pagination, filtering, sorting)
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 }); // Sort by latest
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single article by ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an article
exports.updateArticle = async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Like an article
exports.likeArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        // Assuming you have user authentication, get the user ID from req.user
        // For now, we'll just push a dummy user ID (replace with actual user logic)
        const dummyUserId = 'DUMMY_USER_ID'; // Replace with actual user ID

        if (!article.likes.includes(dummyUserId)) {
            article.likes.push(dummyUserId);
            await article.save();
            res.json({ message: 'Article liked' });
        } else {
            article.likes.pull(dummyUserId);
            await article.save();
            res.json({ message: 'Article unliked' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- Suggest Articles (Basic Example based on Categories/Tags) ---
exports.suggestArticles = async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Basic suggestion: find articles with similar categories or tags
        const suggestedArticles = await Article.find({
            _id: { $ne: articleId }, // Exclude the current article
            $or: [
                { categories: { $in: article.categories } }, // Articles with same categories
                { tags: { $in: article.tags } }          // Articles with same tags
            ]
        }).limit(3); // Limit to a few suggestions

        res.json(suggestedArticles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};