const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Ajouter un post
router.post('/ajout', async (req, res) => {
    try {
        const { titre, contenu, auteur } = req.body;
        const nouveauPost = new Post({ titre, contenu, auteur });
        await nouveauPost.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Erreur lors de l'ajout du post");
    }
});

// Supprimer un post
router.post('/supprimer/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Erreur lors de la suppression");
    }
});

// Voter pour un post (Upvote - Bonus très Reddit !)
router.post('/upvote/:id', async (req, res) => {
    try {
        // $inc permet d'incrémenter une valeur dans MongoDB
        await Post.findByIdAndUpdate(req.params.id, { $inc: { votes: 1 } });
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Erreur lors du vote");
    }
});


// Modifier le contenu d'un post
router.post('/modifier/:id', async (req, res) => {
    try {
        // On cherche le post par son ID et on remplace son "contenu" par ce qui a été tapé
        await Post.findByIdAndUpdate(req.params.id, { contenu: req.body.nouveauContenu });
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Erreur lors de la modification");
    }
});

module.exports = router;