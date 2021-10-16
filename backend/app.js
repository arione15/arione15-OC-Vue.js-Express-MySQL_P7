const express = require('express');
const cors = require("cors");
const path = require('path');
const sequelize = require('./config/db.config')
const { Sequelize, DataTypes } = require('sequelize'); // importer aussi l'objet DataTypes
const { users, medias } = require('./config/dataFixtures');

const UserModel = require('./models/User'); 
const MediaModel = require('./models/Media'); 

const app = express();

// les variables d'environnement
require('dotenv').config();

// // middleware pour gérer le CORS Cross Origin Resource Sharing (ajoute des headers à l'objet response qui permet à des requetes de différentes rigines de communiquer entre elles)
app.use(cors()); 

// instanciation de la classe User
const User = UserModel(sequelize, DataTypes);

// instanciation de la classe Media
const Media = MediaModel(sequelize, DataTypes);


// synchronisation du modèle User avec la BDD
sequelize.sync({force: true}) // à utliser uniquement en dev : supprime la table avant de faire la synchronisation
    .then(() => {
        console.log('La base de donnée "groupomania" a bien été synchronisée !');
        users.map(user => {User.create({
            name: user.name,
            firstname: user.firstname,
            email: user.email,
            password: user.password,
            imageUrl: user.imageUrl
        }).then(toto => console.log(toto.toJSON()))
        })
        });


// synchronisation du modèle Media avec la BDD
sequelize.sync({force: true})
    .then(() => {
        console.log('La base de donnée "groupomania" a bien été synchronisée !');
        medias.map(media => {Media.create({
            description: media.description,
            mediaUrl: media.mediaUrl,
            userId: media.userId,
            likes: media.likes,
            dislikes: media.dislikes,
            usersLiked: media.usersLiked,
            usersDisliked: media.usersDisliked,
        }).then(titi => console.log(titi.toJSON()))
        })
        });

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