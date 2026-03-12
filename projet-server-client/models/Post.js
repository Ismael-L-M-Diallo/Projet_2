const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    votes: { type: Number, default: 0 }, 
    dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);