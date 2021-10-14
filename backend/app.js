const express = require('express');
const cors = require("cors");
const path = require('path');
const sequelize = require('./config/db.config')
const { Sequelize, DataTypes } = require('sequelize'); // importer aussi l'objet DataTypes

const UserModel = require('./models/User'); 

const app = express();

// les variables d'environnement
require('dotenv').config();

// // middleware pour gérer le CORS Cross Origin Resource Sharing (ajoute des headers à l'objet response qui permet à des requetes de différentes rigines de communiquer entre elles)
app.use(cors()); 

// instanciation de la classe User
const User = UserModel(sequelize, DataTypes);

// synchronisation des models avec la BDD
sequelize.sync({force: true})
    .then(_ => console.log('La base de donnée "groupomania" a bien été synchronisée !'));

// définir la fonction json de express comme middleware global pour l'application
app.use(express.json());

// // utilisation des ressources "static", içi les images 
app.use('/images', express.static(path.join(__dirname, '/images')));



// Tester le serveur backend et l'app avec get et post
app.get('/test', (req, res) => {
    res.send({
        message: 'Hello P7-OC'
    })
})

module.exports = app;