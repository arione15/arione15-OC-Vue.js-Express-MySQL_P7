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
        Comment.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId"
        });
        Comment.belongsTo(models.Post, {
            as: "post",
            foreignKey: "postId"
        });
    };
    return Comment;
}