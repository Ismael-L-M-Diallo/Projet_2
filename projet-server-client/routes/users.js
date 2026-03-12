const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/inscription', async (req, res) => {
    try {
        const nouvelUtilisateur = new User({ 
            pseudo: req.body.pseudo, 
            motDePasse: req.body.motDePasse 
        });
        await nouvelUtilisateur.save();
        
        req.session.userId = nouvelUtilisateur._id;
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Erreur (Pseudo peut-être déjà pris)");
    }
});

router.post('/connexion', async (req, res) => {
    try {
        const user = await User.findOne({ pseudo: req.body.pseudo, motDePasse: req.body.motDePasse });
        if (user) {
            req.session.userId = user._id; 
            res.redirect('/');
        } else {
            res.status(401).send("Pseudo ou mot de passe incorrect");
        }
    } catch (err) {
        res.status(500).send("Erreur serveur");
    }
});

router.get('/deconnexion', (req, res) => {
    req.session.destroy(); 
    res.redirect('/');
});

module.exports = router;