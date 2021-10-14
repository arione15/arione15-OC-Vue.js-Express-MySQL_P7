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

module.exports = sequelize;
