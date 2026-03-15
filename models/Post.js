// Import de Mongoose
const mongoose = require('mongoose');

// Définition de la structure (schéma) d'un post
const PostSchema = new mongoose.Schema({
    titre: { type: String, required: true }, // Titre obligatoire
    contenu: { type: String, required: true }, // Contenu obligatoire
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Lien vers un utilisateur
    votes: { type: Number, default: 0 }, // Nombre de votes (0 par défaut)
    dateCreation: { type: Date, default: Date.now } // Date automatique à la création
});

// Export du modèle pour l'utiliser ailleurs
module.exports = mongoose.model('Post', PostSchema);