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
const { sequelize } = require('./models/index');


//const { initDb } = require('./config/dbConfig');
//initDb();

const app = express();

// les variables d'environnement
require('dotenv').config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// middleware pour gérer le CORS Cross Origin Resource Sharing (ajoute des headers à l'objet response qui permet à des requetes de différentes rigines de communiquer entre elles)

// const corsOptions = {
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
// }
// app.use(cors(corsOptions));
//app.use(cors());


app.use(express.json()); // définir la fonction json de express comme middleware global pour l'application
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // entre autres, prend le jwt et le met dans un cookie


//app.use('/images', express.static('images'));

// pour la version de l'api
//app.use("/api/v1", api);

// utilisation des ressources "static", içi les images/vidéos
app.use('/images', express.static(path.join(__dirname, 'images')));
//app.use('/images', express.static(path.join(__dirname, 'profil')));

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/like', likeRoutes);

const dbTest = async function() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
dbTest();

sequelize.sync({ force: false });

module.exports = app;