'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
                message: "Cette adresse email est déjà prise. Choisissez une autre !"
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
            allowNull: true,
            default: "basic"
        }
    });

    User.associate = models => {
        User.hasMany(models.Post, { onDelete: 'cascade' });
        User.hasMany(models.Comment, { onDelete: 'cascade' });
        User.hasMany(models.Like, { onDelete: 'cascade' });
    };

    return User;
}