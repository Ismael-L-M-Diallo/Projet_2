const mongoose = require('mongoose');

const TacheSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String },
    dateCreation: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tache', TacheSchema);