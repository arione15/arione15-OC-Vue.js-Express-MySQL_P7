const express = require('express');
const cors = require("cors");
const path = require('path');

const app = express();

// les variables d'environnement
require('dotenv').config();

// // Connexion à mongoDB Atlas via mangoose
// mongoose.connect(process.env.DB_URL,
//   { useNewUrlParser: true,
//     useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !'));

// middleware pour gérer le CORS Cross Origin Resource Sharing (ajoute des headers à l'objet response qui permet à des requetes de différentes rigines de communiquer entre elles)
app.use(cors()); 

// définir la fonction json de express comme middleware global pour l'application
app.use(express.json());

// utilisation des ressources "static", içi les images 
//app.use('/images', express.static(path.join(__dirname, '/images')));

// Tester le serveur backend et l'app avec get et post
app.get('/test', (req, res) => {
    res.send({
        message: 'Hello P7'
    })
})
app.post('/login', (req, res) => {
    res.send({
        message: `Hello ${req.body.email} P7-OC`
    })
})

module.exports = app;