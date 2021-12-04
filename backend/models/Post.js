'use strict';

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        userId: {
            type: DataTypes.UUID,
            allowNull: false
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
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Post.associate = models => {
        Post.hasMany(models.Comment, { onDelete: 'cascade' });
        Post.hasMany(models.Like, { onDelete: 'cascade' });
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Post;
}