module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        postUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        likes: {
            type: DataTypes.INTEGER,
            default: 0
        },
        dislikes: {
            type: DataTypes.INTEGER,
            default: 0
        },
        usersLiked: {
            type: DataTypes.INTEGER,
            allowNull: true,
            default: []
        },
        usersDisliked: {
            type: DataTypes.INTEGER,
            allowNull: true,
            default: []
        }
    });
    return Post;
}