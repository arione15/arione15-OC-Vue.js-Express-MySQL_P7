'use strict';

module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isLike: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    Like.associate = models => {
        Like.belongsTo(models.Post, {
            foreignKey: { name: 'postId', allowNull: false },
            onDelete: 'cascade'
        });
        Like.belongsTo(models.User, {
            foreignKey: { name: 'userId', allowNull: false },
            onDelete: 'cascade'
        });
        Post.belongsToMany(models.User, {
            through: Like,
            foreignKey: 'postId',
            otherKey: 'userId',
            onDelete: 'cascade'
        });
        User.belongsToMany(models.Post, {
            through: Like,
            foreignKey: 'userId',
            otherKey: 'postId'
        });
    };
    return Like;
};