module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        posterId: {
            type: DataTypes.UUID,
            required: true
        },
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

        likes: {
            type: DataTypes.INTEGER,
            default: 0
        },
        dislikes: {
            type: DataTypes.INTEGER,
            default: 0
        },
        timestamps: true
    });
    // Post.associate = function() {
    //     Post.hasMany(Comment, {
    //         foreignKey: post_id,
    //         onDelete: 'CASCADE'
    //     })
    // };
    // Comment.associate = function() {
    //     Comment.belongsTo(Post, {
    //         foreignKey: postId,
    //         onDelete: "CASCADE"
    //     });
    // };
    // User.associate = function() {
    //     User.hasMany(Post, {
    //         foreignKey: user_id,
    //         onDelete: 'CASCADE'
    //     })
    // };
    // Post.associate = function() {
    //     Post.belongsTo(User, {
    //         foreignKey: userId,
    //         onDelete: "CASCADE"
    //     });
    // };

    Post.associate = models => {
        Post.belongsTo(models.User);
        Post.hasMany(models.Comment);
    };
    return Post;
}