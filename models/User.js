// Import de Mongoose
const mongoose = require('mongoose');

// Structure des données utilisateur
const UserSchema = new mongoose.Schema({
    pseudo: { type: String, required: true, unique: true }, // Unique : empêche les doublons de pseudos
    motDePasse: { type: String, required: true }, // Mot de passe obligatoire
    dateInscription: { type: Date, default: Date.now } // Date d'inscription auto
});

// Export du modèle 'User'
module.exports = mongoose.model('User', UserSchema);