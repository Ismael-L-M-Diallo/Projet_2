const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ajouter un utilisateur
router.post('/ajout', async (req, res) => {
    try {
        const nouvelUtilisateur = new User({ pseudo: req.body.pseudo });
        await nouvelUtilisateur.save();
        res.redirect('/'); // Retour à l'accueil
    } catch (err) {
        res.status(500).send("Erreur lors de l'ajout de l'utilisateur");
    }
});

module.exports = router;