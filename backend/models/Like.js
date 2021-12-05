'use strict';
module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
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
        }
    });
    models.User.belongsToMany(Post, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'postId'
    });
    models.Post.belongsToMany(User, {
        through: models.Like,
        foreignKey: 'postId',
        otherKey: 'userId'
    });
    models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
    });

    models.Like.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post'
    });
    return Like;
};