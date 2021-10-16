const http = require('http');
//const app = require('./app');


const express = require('express');
const cors = require("cors");
const path = require('path');

const { Sequelize } = require('sequelize');

// instanciation de l'objet sequelize
const sequelize = new Sequelize(
    'groupomania',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
})

// test de connexion à la BDD
sequelize.authenticate()
.then(_ => console.log('Connexion réussie !'))
.catch(error => console.error(`Echec de la connexion : ${error}`))

const app = express();

// les variables d'environnement
require('dotenv').config();


// middleware pour gérer le CORS Cross Origin Resource Sharing (ajoute des headers à l'objet response qui permet à des requetes de différentes rigines de communiquer entre elles)
app.use(cors()); 

// définir la fonction json de express comme middleware global pour l'application
app.use(express.json());

// utilisation des ressources "static", içi les images 
//app.use('/images', express.static(path.join(__dirname, '/images')));




const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

//port d'écoute de l'appli express
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//création du serveur http et de la fonction (ici app) qui sera appelée à chaque requête faite à ce serveur
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});


// Tester le serveur backend et l'app avec get et post
app.get('/test', (req, res) => {
    res.send({
        message: 'Hello P7-OC'
    })
})


server.listen(port);