const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // Markdown content will be stored here
    author: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model (for future)
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Users who liked the article
    tags: [String], // Optional tags for categorization
    // For suggestions (you can expand this based on complexity)
    categories: [String],
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Article', ArticleSchema);