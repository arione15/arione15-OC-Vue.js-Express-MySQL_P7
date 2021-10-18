const { Sequelize, DataTypes } = require('sequelize'); // importer aussi l'objet DataTypes
const UserModel = require('./models/User'); 
const PostModel = require('./models/Post');
const { users, posts } = require('./dataFixtures');

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

// instanciation des classes User et Post
const User = UserModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);
            acquire: 30000, // maximum time (ms) that pool will try to get connection before throwing error
            idle: 10000
        }
    }
)

// test de connexion à la BDD
sequelize.authenticate()
.then(() => console.log('Connexion réussie !'))
.catch(error => console.error(`Echec de la connexion : ${error}`));

// synchronisation du modèle User avec la BDD
const initDb = () => {
    return sequelize.sync({force: true}) // à utliser uniquement en dev : supprime la table avant de faire la synchronisation
    .then(_ => {
        console.log('La table User de la BDD "groupomania" a bien été synchronisée !');
        users.map(user => {User.create({
            name: user.name,
            firstname: user.firstname,
            email: user.email,
            password: user.password,
            imageUrl: user.imageUrl
        }).then(toto => console.log(toto.toJSON()))
        })

// synchronisation du modèle Post avec la BDD
        posts.map(post => {
            Post.create({
                description: post.description,
                postUrl: post.postUrl,
                userId: post.userId,
                likes: post.likes,
                dislikes: post.dislikes,
                usersLiked: post.usersLiked,
                usersDisliked: post.usersDisliked
                })
                .then(titi => console.log(titi.toJSON()))
                console.log('La table Media de la BDD "groupomania" a bien été synchronisée !');
        })
    })
}

module.exports = {sequelize, initDb, User, Post};
