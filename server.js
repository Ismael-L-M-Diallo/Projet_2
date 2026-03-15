require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'mon_secret_super_cache',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Connexion MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { family: 4 })
    .then(() => console.log( 'MongoDB Atlas connecté'))
    .catch(err => console.error(' Erreur MongoDB:', err));

// Modèles
const User = require('./models/User');
const Post = require('./models/Post');
const Task = require('./models/Task');

// Routes
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/api/tasks', require('./routes/tasks'));

// Page principale
app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        let filtre = {};
        if (req.query.auteurId) filtre = { auteur: req.query.auteurId };

        // Tri posts dynamique
        const sortOptions = {};
        const { sort, order } = req.query;
        if (sort) {
            sortOptions[sort] = order === 'desc' ? -1 : 1;
        } else {
            sortOptions.votes = -1;
        }

        const posts = await Post.find(filtre).populate('auteur').sort(sortOptions);
        const idConnecte = req.session.userId || null;

        res.render('index', { 
            users, 
            posts, 
            filtreActuel: req.query.auteurId, 
            idConnecte,
            req
        });
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Chatbot Socket.io
const BOT_NAME = 'ConnectBot';

function getBotReply(msg) {
    const text = msg.toLowerCase();
    if (text.includes('bonjour') || text.includes('salut')) return "Salut ! Je suis ConnectBot 🤖 Comment puis-je t'aider ?";
    if (text.includes('tâche') || text.includes('tache')) return " Utilise le gestionnaire de tâches pour créer, trier et rechercher !";
    if (text.includes('aide')) return "Tape 'bonjour', 'tâche', ou 'posts' !";
    if (text.includes('posts')) return " Les posts sont triables par votes, date ou titre !";
    return " ConnectBot : Je n'ai pas compris, tape 'aide' !";
}

io.on('connection', (socket) => {
    console.log('🔌 Client connecté:', socket.id);
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', { from: 'user', text: msg });
        io.emit('chatMessage', { from: BOT_NAME, text: getBotReply(msg) });
    });
    socket.on('disconnect', () => {
        console.log(' Client déconnecté:', socket.id);
    });
});

// Lancement
const PORT = process.env.PORT || 3000;
serverHttp.listen(PORT, () => {
    console.log(` Serveur sur http://localhost:${PORT}`);
});