const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Post', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
            type: Sequelize.STRING,
            get() {
                return this.getDataValue('likers').split(';')
            },
            set(val) {
                this.setDataValue('likers', val.join(';'));
            },
        },
        dislikers: {
            type: Sequelize.STRING,
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
        // timestamps: true
    });
    return Post;
}




id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true

}, Record ID
Video ID
User ID
Parent ID(
    for nested comments)
Comment
Like status
Date time.