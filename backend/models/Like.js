'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            models.User.belongsToMany(models.Post, {
                through: models.Like,
                foreignKey: 'userId',
                otherKey: 'postId',
            });

            models.Post.belongsToMany(models.User, {
                through: models.Like,
                foreignKey: 'postId',
                otherKey: 'userId',
            });

            models.Like.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });

            models.Like.belongsTo(models.Post, {
                foreignKey: 'postId',
                as: 'post',
            });
        }
    };
    Like.init({
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        postId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        isLike: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'Like',
        tableName: 'likes',
    });
    return Like;
};