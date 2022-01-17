const { Sequelize, DataTypes } = require('sequelize'); // importer aussi l'objet DataTypes
const UserModel = require('../models/User');
const PostModel = require('../models/Post');
const { users, posts } = require('./dataFixtures');
const bcrypt = require('bcrypt');
//const { users } = require('../routes/users/signup');

// instanciation de l'objet sequelize
const sequelize = new Sequelize('groupomania', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        timezone: '+0Etc/GMT+1'
    },
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // maximum time (ms) that pool will try to get connection before throwing error
        idle: 10000
    }
})

// test de connexion à la BDD
sequelize.authenticate()
    .then(() => console.log('Connexion réussie !'))
    .catch(error => console.error(`Echec de la connexion : ${error}`));

// instanciation des classes UserModel et PostModel : elles donnent lieu aux tables users et posts
const User = UserModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);

// synchronisation de toutes les tables de la BDD groupomania
sequelize.sync()

//module.exports = {initDb, User, Post};
module.exports = { sequelize, User, Post };