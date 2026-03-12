require('dotenv').config();

// Importation des modules nécessaires
const express = require('express');       
const mongoose = require('mongoose');    
const path = require('path');            

// Configuration DNS pour éviter les bugs de connexion avec MongoDB Atlas
const dns = require('dns');             
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Création de l'application Express
const app = express();

// Middleware pour analyser les données des requêtes POST
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// Middleware pour servir des fichiers statiques et moteur de rendu
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); 

// Connexion à la base de données MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    family: 4 // Force l'IPv4 pour éviter les erreurs de résolution DNS
})
    .then(() => console.log('MongoDB Atlas connecté')) 
    .catch(err => console.log('Erreur de connexion MongoDB:', err)); 


// ==========================================
// ROUTES DU MINI REDDIT (Remplacent les tâches)
// ==========================================

// 1. On charge nos modèles pour s'en servir sur la page d'accueil
const User = require('./models/User');
const Post = require('./models/Post');

// 2. On lie les URL /users et /posts à nos fichiers de routes
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

// 3. Nouvelle route d'accueil (qui affiche les utilisateurs et les posts)
// Nouvelle route d'accueil avec filtre
app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        
        // 1. On crée un objet filtre vide par défaut (qui prendra tous les posts)
        let filtre = {};
        
        // 2. Si on reçoit une demande de filtre par auteurId, on met à jour le filtre
        if (req.query.auteurId) {
            filtre = { auteur: req.query.auteurId };
        }

        // 3. On applique le filtre dans le ".find(filtre)"
        const posts = await Post.find(filtre).populate('auteur').sort({ votes: -1 });
        
        // 4. On envoie aussi "filtreActuel" à la vue pour garder le menu déroulant sur le bon choix
        res.render('index', { users, posts, filtreActuel: req.query.auteurId }); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur lors du chargement de l\'accueil');
    }
});
// ==========================================


// Démarrage du serveur sur un port spécifique
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));