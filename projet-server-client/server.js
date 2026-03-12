require('dotenv').config();

const express = require('express');       
const mongoose = require('mongoose');    
const path = require('path');            
const session = require('express-session');

const dns = require('dns');             
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use(session({
    secret: 'mon_secret_super_cache',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); 

mongoose.connect(process.env.MONGO_URI, {
    family: 4 
})
    .then(() => console.log('MongoDB Atlas connecté')) 
    .catch(err => console.log('Erreur de connexion MongoDB:', err)); 


const User = require('./models/User');
const Post = require('./models/Post');

app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));


app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        let filtre = {};
        if (req.query.auteurId) filtre = { auteur: req.query.auteurId };

        const posts = await Post.find(filtre).populate('auteur').sort({ votes: -1 });
        
        const idConnecte = req.session.userId || null;

        res.render('index', { users, posts, filtreActuel: req.query.auteurId, idConnecte }); 
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));