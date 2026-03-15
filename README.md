# Projet Site Web Full-Stack
Projet de site web dynamique avec chat et requetes dynamiques base sur Node.js/Express/MongoDB

##  Description du projet

**ConnectHub** est une plateforme sociale inspirée de **Reddit/X (Twitter)** combinant :
- **Système de posts** (CRUD + votes + filtres) 
- **Gestionnaire de tâches** (CRUD + recherche + tri)
- **Chat bot temps réel** avec Socket.io
- **Authentification** (inscription/connexion/sessions)

**Fonctionnalités principales** :
```
- Posts : Créer/Modifier/Supprimer/Upvote/Filtrer par auteur
- Tâches : Ajouter/Cocher/Supprimer/Rechercher/Trier (titre/date)document
- Chat : Discussion temps réel avec ConnectBot (IA simple)
- Auth : Sessions sécurisées + interface moderne Bootstrap
- Design : Thème sombre Reddit + animations + Offcanvas
```

##  Architecture technique

```
├── server.js           → Express + Socket.io + Mongo Atlas
├── models/             → User.js, Post.js, Task.js (Mongoose)
├── routes/             → users.js, posts.js, tasks.js
├── views/              → index.ejs (Bootstrap 5 + EJS)
├── public/             → CSS/JS statiques (app.js etc.)
├── .env                → MONGO_URI (Atlas)
└── package.json        → Node.js 20+, Express 5+, Mongoose 9+
```

##  Installation & Lancement

### Prérequis
- **Node.js** ≥ 18.x
- **MongoDB Atlas** (compte gratuit créé)

### Étapes
1. Cloner/décompresser le projet
2. npm install
3. Créer .env avec MONGO_URI (voir ci-dessous)
4. npm start
5. Ouvrir http://localhost:3000

**Whitelist IP** : 0.0.0.0/0 (toutes IPs pour dev)

##  Fonctionnalités techniques avancées

### 1. **Gestionnaire de Tâches (API REST)**
```
GET    /api/tasks              → Liste (recherche + tri)
POST   /api/tasks              → Créer tâche
PUT    /api/tasks/:id          → Cocher/Modifier
DELETE /api/tasks/:id          → Supprimer
```
**Filtres** : `?search=mot&sort=title&order=asc`

### 2. **Chat temps réel (Socket.io)**
```
Événements : 'chatMessage' ↔ Temps réel multi-clients
Bot IA : Répond à "bonjour", "tâche", "aide", "posts"...
```

### 3. **Système Posts (CRUD + Sécurité)**
```
- Vérification auteur avant modifier/supprimer
- Système de votes (upvote)
- Filtrage par utilisateur
- Sessions Express
```

### 4. **Interface moderne**
```
- Bootstrap 5 + Thème sombre Reddit
- Offcanvas Chat (mobile-friendly)
- Animations CSS + Hover effects
- Design responsive
```

##  Test des fonctionnalités

```
1. Inscription → Connexion → Créer post
2. Upvote posts → Filtrer par auteur
3. Ouvrir Chat → "bonjour" → Bot répond
4. Ajouter tâche → Cocher → Supprimer
5. Recherche "test" → Tri titre → Tout OK 
```

##  Structure MongoDB

```
Collections créées automatiquement :
- users     → pseudo, motDePasse, dateInscription
- posts     → titre, contenu, auteur, votes, dateCreation  
- tasks     → title, completed, author, createdAt, updatedAt
```

##  Difficultés rencontrées & Solutions

| Problème | Solution |
|----------|----------|
| **Fusion CommonJS/ES6** | Uniformisation `require/module.exports` |
| **Mongo Atlas IP** | Whitelist 0.0.0.0/0 + DNS Google (8.8.8.8) |
| **Socket.io + Express** | `http.createServer(app)` au lieu de `app.listen` |
| **EJS + API REST** | Fetch API + Socket.io client dans même page |
| **Sessions + API** | Middleware `express-session` préservé |

##  Points forts & Innovations

1. **Architecture modulaire** : Routes séparées (RESTful)
2. **Full CRUD** : 3 entités (User/Post/Task)
3. **Temps réel** : Socket.io + Chatbot IA
4. **UX moderne** : Bootstrap 5 + Animations + Offcanvas
5. **Sécurité** : Sessions + Vérification auteur
6. **Responsive** : Mobile-first design
7. **MongoDB Atlas** : Déploiement cloud 0 config

##  Stack technique complet

```
Frontend   → EJS + Bootstrap 5 + CSS3 Animations + Fetch API
Backend    → Node.js 20 + Express 5 + Socket.io
Base       → MongoDB Atlas + Mongoose 9 (ODM)
Sessions   → express-session
Sécurité   → DNS Google + IP Whitelist
Déploiement→ npm start (0 config)
```

##  Répartition du travail

**Manu** :
- Design Reddit-like + Responsive
- Organisation HTML
- Animations CSS + Offcanvas

**Ismaël** :
- Gestionnaire tâches (CRUD + recherche + tri)
- Chat bot Socket.io (IA contextuelle)
- Fusion API REST + Interface moderne
  

**Esteban** :
- Système Users/Posts (auth + CRUD + votes)
- MongoDB Atlas (config + modèles)
- Routes Express + Sessions


***
