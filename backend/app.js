'use strict';

const express = require('express');
const { checkUser, requireAuth } = require('./middlewares/authUser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRt');
const postRoutes = require('./routes/postRt');
const commentRoutes = require('./routes/commentRt');
const likeRoutes = require('./routes/likeRt');
const path = require('path');

//const { initDb } = require('./config/dbConfig');
//initDb();
const db = require('./config/db');
db.sequelize.sync({ force: false })
    .then(() => console.log("DB Synced"))
    .catch(error => console.log(error));
const app = express();

// les variables d'environnement
require('dotenv').config();

// middleware pour gérer le CORS Cross Origin Resource Sharing (ajoute des headers à l'objet response qui permet à des requetes de différentes rigines de communiquer entre elles)

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));
//app.use(cors());


app.use(express.json()); // définir la fonction json de express comme middleware global pour l'application
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // entre autres, prend le jwt et le met dans un cookie


//app.use('/images', express.static('images'));

// pour la version de l'api
//app.use("/api/v1", api);

// pour authentifier le user sur toutes les routes get
app.get('*', checkUser);

// pour récupérer le id d'un user
app.get('/jwtid', requireAuth, (req, res) => {
    //res.status(200).send(res.locals.user.id });
    //res.status(200).json({ "userFromTheBack": res.locals.user });
    res.status(200).send(res.locals.user)

});

// utilisation des ressources "static", içi les images/vidéos
app.use('/images', express.static(path.join(__dirname, 'images')));
//app.use('/images', express.static(path.join(__dirname, 'profil')));

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/post-comment', commentRoutes);
app.use('/api/like', likeRoutes);

module.exports = app;