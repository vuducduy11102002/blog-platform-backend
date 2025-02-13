const Comment = require('../models/Comment');

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const newComment = new Comment({
            ...req.body,
            articleId: req.params.articleId // Article ID is in the URL params
        });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get comments for an article
exports.getCommentsByArticle = async (req, res) => {
    try {
        const comments = await Comment.find({ articleId: req.params.articleId })
                                       .sort({ createdAt: -1 }); // Sort by latest
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a comment (requires authentication in real app)
exports.deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    // ... (Implementation for getting user profile) ...
    res.json({ message: 'User profile endpoint' });
};