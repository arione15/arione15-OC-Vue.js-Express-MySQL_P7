'use strict';

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
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
            foreignKey: {
                allowNull: false
            },
            onDelete: 'cascade'
        });

        models.Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'cascade'
        });
    };
    return Comment;
}