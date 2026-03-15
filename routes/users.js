const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Inscription d'un nouvel utilisateur
router.post('/inscription', async (req, res) => {
    try {
        const nouvelUtilisateur = new User({ 
            pseudo: req.body.pseudo, 
            motDePasse: req.body.motDePasse 
        });
        await nouvelUtilisateur.save(); // Enregistre en base de données
        
        req.session.userId = nouvelUtilisateur._id; // Connecte l'utilisateur direct après inscription
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Erreur (Pseudo peut-être déjà pris)"); // Gère l'erreur d'unicité du pseudo
    }
});

// Connexion d'un utilisateur existant
router.post('/connexion', async (req, res) => {
    try {
        // Cherche un utilisateur avec le même pseudo ET le même mot de passe
        const user = await User.findOne({ pseudo: req.body.pseudo, motDePasse: req.body.motDePasse });
        if (user) {
            req.session.userId = user._id; // Stocke l'ID dans la session
            res.redirect('/');
        } else {
            res.status(401).send("Pseudo ou mot de passe incorrect");
        }
    } catch (err) {
        res.status(500).send("Erreur serveur");
    }
});

// Déconnexion
router.get('/deconnexion', (req, res) => {
    req.session.destroy(); // Supprime les données de session
    res.redirect('/');
});

module.exports = router;