const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const checkUser = require('./middlewares/authUser');
const path = require('path');
const { initDb } = require('./config/dbConfig');
cont { getAll } = require('./routes/users/user')
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
app.get('*', checkUser);

// base des routes de l'api
require('./routes/posts/findAllPosts')(app);
require('./routes/posts/findByPkPost')(app);
require('./routes/posts/createPost')(app);
require('./routes/posts/updatePost')(app);
require('./routes/posts/deletePost')(app);

require('./routes/users/login')(app);
require('./routes/users/signup')(app);
require('./routes/users/logout')(app);
require('./routes/users/user')(app);
//require('./routes/users/updateUser')(app);
//require('./routes/users/deleteUser')(app);

module.exports = app;