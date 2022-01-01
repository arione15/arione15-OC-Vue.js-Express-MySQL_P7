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
            foreignKey: 'postId',
            onDelete: 'cascade',
            as: 'post',
        });
        Like.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'cascade',
            as: 'user',
        });
    };
    return Like;
};