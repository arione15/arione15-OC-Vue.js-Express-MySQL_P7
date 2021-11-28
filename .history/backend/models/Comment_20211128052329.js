const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        // userId: {
        //     type: DataTypes.STRING,
        //     required: true
        // },
        // posterId: {
        //     type: DataTypes.STRING,
        //     required: true
        // },
        message: {
            type: DataTypes.TEXT,
            trim: true,
            allowNull: false
        },
        // likers: {
        //     type: DataTypes.STRING,
        //     get() {
        //         return this.getDataValue('likers').split(';')
        //     },
        //     set(val) {
        //         this.setDataValue('likers', val.join(';'));
        //     },
        // },
        // dislikers: {
        //     type: DataTypes.STRING,
        //     get() {
        //         return this.getDataValue('dislikers').split(';')
        //     },
        //     set(val) {
        //         this.setDataValue('dislikers', val.join(';'));
        //     },
        // },
        // // likers: {
        // //     type: DataTypes.INTEGER,
        // //     required: true,
        // //     default: []
        // // },
        // // dislikers: {
        // //     type: DataTypes.INTEGER,
        // //     allowNull: true,
        // //     default: []
        // // },
        // likes: {
        //     type: DataTypes.INTEGER,
        //     default: 0
        // },
        // dislikes: {
        //     type: DataTypes.INTEGER,
        //     default: 0
        // },
        //timestamps: true
    });
    Post.associate = function() {
        Post.hasMany(Comment, {
            foreignKey: post_id,
            onDelete: 'CASCADE'
        })
    };
    Comment.associate = function() {
        Comment.belongsTo(Post, {
            foreignKey: postId,
            onDelete: "CASCADE"
        });
    };
    Comment.associate = function() {
        Comment.belongsTo(Post, {
            foreignKey: postId,
            onDelete: "CASCADE"
        });
    };

    Comment.associate = function() {
        Comment.belongsTo(User, {
            onDelete: "CASCADE"
        });
    };
    return Comment;
}