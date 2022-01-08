'use strict';

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
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
        // },
        // youtubeId: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // }
    });

    Post.associate = models => {
        models.Post.hasMany(models.Like, { onDelete: 'cascade' });
        models.Post.hasMany(models.Comment, { onDelete: 'cascade' });
        models.Post.belongsTo(models.User, {
            foreignKey: { name: 'userIdi', allowNull: false },
            onDelete: 'cascade',
            as: 'user',
        });
    }
    return Post;
}