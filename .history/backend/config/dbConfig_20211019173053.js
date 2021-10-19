const { Sequelize, DataTypes } = require('sequelize'); // importer aussi l'objet DataTypes
const UserModel = require('../models/User'); 
const PostModel = require('../models/Post');
const { users, posts } = require('./dataFixtures');
const bcrypt = require('');

// instanciation de l'objet sequelize
const sequelize = new Sequelize('groupomania', 'root', '', {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000, // maximum time (ms) that pool will try to get connection before throwing error
            idle: 10000
        }
    }
)

// test de connexion à la BDD
sequelize.authenticate()
.then(() => console.log('Connexion réussie !'))
.catch(error => console.error(`Echec de la connexion : ${error}`));

// instanciation des classes UserModel et PostModel : elles donnent lieu aux tables users et posts
const User = UserModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);

// synchronisation de toutes les tables de la BDD groupomania
const initDb = () => 
{
    return sequelize.sync({ force: true })
.then(_ => 
{users.map(user => 
{
User.create({
            name: user.name,
            firstname: user.firstname,
            email: user.email,
            password: user.password,
            imageUrl: user.imageUrl
}).then(xUser => console.log(xUser.toJSON()))
}
);
posts.map(post => 
{
Post.create({
            title: post.title,
            description: post.description,
            postUrl: post.postUrl,
            userId: post.userId,
            likes: post.likes,
            dislikes: post.dislikes,
            usersLiked: post.usersLiked,
            usersDisliked: post.usersDisliked
}).then(xPost => console.log(xPost.toJSON()))
}
);
}
)};

module.exports = {initDb, User, Post};
