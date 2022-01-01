const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    // storage: './database/sequelize.db'
    logging: true
});

sequelize.authenticate()
    .then(() => console.log("DB connected"))
    .catch(error => console.log(error));

const db = {}
db.sequelize = sequelize;

db.User = require("../models/User")(sequelize, DataTypes)
db.Post = require("../models/Post")(sequelize, DataTypes)
module.exports = db;