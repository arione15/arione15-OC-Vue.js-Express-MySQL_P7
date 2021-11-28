const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        // posterId: {
        //     type: DataTypes.STRING,
        //     required: true
        // },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            trim: true,
            allowNull: false
        },
        imageURL: {
            type: DataTypes.STRING
        },
        videoURL: {
            type: DataTypes.STRING
        },
        likers: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('likers').split(';')
            },
            set(val) {
                this.setDataValue('likers', val.join(';'));
            },
            required: true
        },
        dislikers: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('dislikers').split(';')
            },
            set(val) {
                this.setDataValue('dislikers', val.join(';'));
            },
            required: true
        },
        // likers: {
        //     type: DataTypes.INTEGER,
        //     required: true,
        //     default: []
        // },
        // dislikers: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     default: []
        // },
        likes: {
            type: DataTypes.INTEGER,
            default: 0
        },
        dislikes: {
            type: DataTypes.INTEGER,
            default: 0
        }
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
            onDelete: "CASCADE",
            targetKey: 'id'
        });
    };
    Post.associate = function() {
        Post.belongsTo(User, {
            foreignKey: userId,
            onDelete: "CASCADE",
            foreignKey: 'userId',
            targetKey: 'id'
        });
    };
    return Post;
}