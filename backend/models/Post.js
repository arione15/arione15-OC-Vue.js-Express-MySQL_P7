'use strict';

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        userId: {
            type: DataTypes.UUID,
            required: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            trim: true,
            allowNull: false
        },
        attachmentUrl: {
            type: DataTypes.STRING
        }
    });

    Post.associate = models => {
        Post.hasMany(models.Comment);
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Post;
}