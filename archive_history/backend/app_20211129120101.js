'use strict';

const express = require('express');
const {
    checkUser
} = require('./middlewares/authUser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRt');
//const postRoutes = require('./routes/postRt');
const path = require('path');
const { initDb } = require('./config/dbConfig');
//initDb();

const app = express();

// les variables d'environnement
require('dotenv').config();

// middleware pour gérer le CORS Cross Origin Resource Sharing (ajoute des headers à l'objet response qui permet à des requetes de différentes rigines de communiquer entre elles)
app.use(cors());

// définir la fonction json de express comme middleware global pour l'application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// utilisation des ressources "static", içi les images/vidéos
app.use('/media', express.static(path.join(__dirname, '/media')));

// pour la version de l'api
//app.use("/api/v1", api);

// pour authentifier le user sur toutes les routes get
//app.get('*', checkUser);


// routes
app.use('/api/user', userRoutes);
//app.use('/api/post', postRoutes);

module.exports = app;