const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true }, 
    dateInscription: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);