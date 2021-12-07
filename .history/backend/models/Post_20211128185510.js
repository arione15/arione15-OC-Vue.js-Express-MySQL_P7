module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        // id: {
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV4,
        //     primaryKey: true,
        //     allowNull: false
        // },
        posterId: {
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
        createdAt: {
            type: DataTypes.DATE
        }
    });

    Post.associate = models => {
        Post.hasMany(models.Comment, {
            as: "comments",
            foreignKey: "posterId"
        });
        Post.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId"
        });
    };
    return Post;
}