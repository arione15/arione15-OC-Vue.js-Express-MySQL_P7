module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
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
        pictureURL: {
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
        },
        dislikers: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('dislikers').split(';')
            },
            set(val) {
                this.setDataValue('dislikers', val.join(';'));
            },
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
        },
        //timestamps: true
    });

    Post.associate = models => {
        Post.hasMany(models.Comment, {
            foreignKey: {
                type: DataTypes.UUID,
                allowNull: false
            },
            onDelete: "cascade"
        });
        Post.hasOne(models.User, {
            foreignKey: {
                type: DataTypes.UUID,
                allowNull: false
            },
            onDelete: "cascade"
        });
    };
    return Post;
}