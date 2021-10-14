const express = require('express');
const cors = require("cors");
const path = require('path');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'groupomania',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'maraidb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        }


})

const app = express();

// les variables d'environnement
require('dotenv').config();


// middleware pour gérer le CORS Cross Origin Resource Sharing (ajoute des headers à l'objet response qui permet à des requetes de différentes rigines de communiquer entre elles)
app.use(cors()); 

// définir la fonction json de express comme middleware global pour l'application
app.use(express.json());

// utilisation des ressources "static", içi les images 
//app.use('/images', express.static(path.join(__dirname, '/images')));

// Tester le serveur backend et l'app avec get et post
app.get('/test', (req, res) => {
    res.send({
        message: 'Hello P7-OC'
    })
})

//port d'écoute de l'appli express
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


require('./routes')(app);
