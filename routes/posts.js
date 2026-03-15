const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Créer un nouveau post
router.post('/ajout', async (req, res) => {
    if (!req.session.userId) return res.send("Non autorisé"); // Vérifie si l'utilisateur est connecté
    try {
        const nouveauPost = new Post({ 
            titre: req.body.titre, 
            contenu: req.body.contenu, 
            auteur: req.session.userId 
        });
        await nouveauPost.save(); // Sauvegarde en base
        res.redirect('/');
    } catch (err) { res.status(500).send("Erreur"); }
});

// Modifier un post existant
router.post('/modifier/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Vérifie que l'utilisateur est bien l'auteur du post
        if (post.auteur.toString() === req.session.userId) {
            post.contenu = req.body.nouveauContenu;
            await post.save();
        }
        res.redirect('/');
    } catch (err) { res.status(500).send("Erreur"); }
});

// Supprimer un post
router.post('/supprimer/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Vérifie l'autorisation avant suppression
        if (post.auteur.toString() === req.session.userId) {
            await Post.findByIdAndDelete(req.params.id);
        }
        res.redirect('/');
    } catch (err) { res.status(500).send("Erreur"); }
});

// Incrémenter les votes
router.post('/upvote/:id', async (req, res) => {
    try {
        if (!req.body.votantId) {
            return res.send("Erreur : Les votes anonymes ne sont pas autorisés ! Rétournez en arrière.");
        }
        // $inc : augmente la valeur du champ 'votes' de 1
        await Post.findByIdAndUpdate(req.params.id, { $inc: { votes: 1 } });
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Erreur lors du vote");
    }
});

module.exports = router;