const express = require('express');
const cors = require("cors");
const path = require('path');

const { initDb } = require('./config/dbConfig');
initDb();

const app = express();

// les variables d'environnement
require('dotenv').config();

// // middleware pour gérer le CORS Cross Origin Resource Sharing (ajoute des headers à l'objet response qui permet à des requetes de différentes rigines de communiquer entre elles)
app.use(cors()); 

// définir la fonction json de express comme middleware global pour l'application
app.use(express.json());

// // utilisation des ressources "static", içi les images 
app.use('/images', express.static(path.join(__dirname, '/images')));

// base des routes de l'api
require('./routes/findAllPosts')(app);
require('./routes/findByPk')(app);
require('./routes/createPost')(app);
// app.use('/api/post', postRoutes);
//app.use('/api/comment', commentRoutes);

module.exports = app;