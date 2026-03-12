// routes/taches.js
const express = require('express');
const router = express.Router();
const Tache = require('../models/Tache');

// Liste des tâches
router.get('/', async (req, res) => {
    try {
        const taches = await Tache.find();
        res.render('index', { taches });
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Ajouter une tâche
router.post('/ajout', async (req, res) => {
    try {
        const { titre, description } = req.body;
        const nouvelleTache = new Tache({ titre, description });
        await nouvelleTache.save();
        res.redirect('/taches');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Supprimer une tâche
router.post('/supprimer/:id', async (req, res) => {
    try {
        await Tache.findByIdAndDelete(req.params.id);
        res.redirect('/taches');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;