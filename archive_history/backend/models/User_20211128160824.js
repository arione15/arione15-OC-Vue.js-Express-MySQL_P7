const Post = require("./Post");
const Comment = require("./Comment");

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            autoIncrement: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        familyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "L'adresse email est déjà prise. Choisissez-en une autre !"
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photoUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            default: "BASIC"
        }
    });

    User.associate = models => {
        User.hasMany(models.Post, {
            as: "posts",
            foreignKey: "userId"
        });
        User.hasMany(models.Comment, {
            as: "comments",
            foreignKey: "userId"
        });
        User.hasMany(models.);
    };

    return User;
}