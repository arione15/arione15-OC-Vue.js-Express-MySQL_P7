'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

//User to Post
User.hasMany(Post, {
    foreignKey: "userId",
    as: "post"
});
Post.belongsTo(User);

//Post to Comment & User to Comment
Post.hasMany(Comment, {
    foreignKey: "postId",
    as: "post",
}, { as: "comment" });
Comment.belongsTo(Post);
User.hasMany(Comment, { as: "comment" });
Comment.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

module.exports = db;