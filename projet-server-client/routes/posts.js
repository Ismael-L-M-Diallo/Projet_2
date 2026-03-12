const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/ajout', async (req, res) => {
    if (!req.session.userId) return res.send("Non autorisé");
    try {
        const nouveauPost = new Post({ 
            titre: req.body.titre, 
            contenu: req.body.contenu, 
            auteur: req.session.userId 
        });
        await nouveauPost.save();
        res.redirect('/');
    } catch (err) { res.status(500).send("Erreur"); }
});

router.post('/modifier/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.auteur.toString() === req.session.userId) {
            post.contenu = req.body.nouveauContenu;
            await post.save();
        }
        res.redirect('/');
    } catch (err) { res.status(500).send("Erreur"); }
});

// Supprimer (On vérifie l'auteur)
router.post('/supprimer/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.auteur.toString() === req.session.userId) {
            await Post.findByIdAndDelete(req.params.id);
        }
        res.redirect('/');
    } catch (err) { res.status(500).send("Erreur"); }
});


router.post('/upvote/:id', async (req, res) => {
    try {
        if (!req.body.votantId) {
            return res.send("Erreur : Les votes anonymes ne sont pas autorisés ! Rétournez en arrière.");
        }

        await Post.findByIdAndUpdate(req.params.id, { $inc: { votes: 1 } });
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Erreur lors du vote");
    }
});

module.exports = router;