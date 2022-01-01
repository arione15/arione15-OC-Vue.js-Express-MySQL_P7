'use strict';

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        message: {
            type: DataTypes.TEXT,
            trim: true,
            allowNull: false
        }
    });

    Comment.associate = models => {
        models.Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'cascade',
            as: 'user',

        });
        models.Comment.belongsTo(models.Post, {
            foreignKey: 'postId',
            onDelete: 'cascade',
            as: 'post',
        });
    };
    return Comment;
}