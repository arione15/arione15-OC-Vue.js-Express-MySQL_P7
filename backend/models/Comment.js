'use strict';

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        postId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            trim: true,
            allowNull: false
        }
    });

    Comment.associate = models => {
        models.User.belongsToMany(models.Post, {
            through: models.Comment,
            foreignKey: 'userId',
            otherKey: 'postId',
        });

        models.Post.belongsToMany(models.User, {
            through: models.Comment,
            foreignKey: 'postId',
            otherKey: 'userId',
        });

        models.Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });

        models.Comment.belongsTo(models.Post, {
            foreignKey: 'postId',
            as: 'post',
        });
    };
    return Comment;
}