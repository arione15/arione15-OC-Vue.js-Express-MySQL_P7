module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING,
            required: true
        },
        posterId: {
            type: DataTypes.STRING,
            required: true
        },
        message: {
            type: DataTypes.TEXT,
            trim: true,
            allowNull: false
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

    Comment.associate = models => {
        Comment.belongsTo(models.User, {
            as: "userpost",
            foreignKey: "userId"
        });
        Comment.belongsTo(models.Post, {
            as: "user",
            foreignKey: "userId"
        });
    };
    return Comment;
}