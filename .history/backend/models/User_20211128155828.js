const Post = require("./Post");
const Comment = require("./Comment");

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            autoIncrement: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        familyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "L'adresse email est déjà prise. Choisissez-en une autre !"
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            default: "BASIC"
        },
        photoUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });
    // User.associate = function() {
    //     User.hasMany(Post, {
    //         foreignKey: user_id,
    //         //     type: DataTypes.UUID,
    //         //     allowNull: false
    //         // },
    //         onDelete: 'CASCADE'

    //     });
    // };
    // Post.associate = function() {
    //     Post.belongsTo(User, {
    //         foreignKey: userId,
    //         //     type: DataTypes.UUID,
    //         //     allowNull: false
    //         // },
    //         onDelete: 'CASCADE'
    //     });
    // };
    // User.associate = function() {
    //     User.hasMany(Comment, {
    //         foreignKey: user_Id,
    //         //     type: DataTypes.UUID,
    //         //     allowNull: false
    //         // },
    //         onDelete: 'CASCADE',
    //     });
    // };
    // Comment.associate = function() {
    //     Comment.belongsTo(User, {
    //         foreignKey: userId,
    //         //     type: DataTypes.UUID,
    //         //     allowNull: false
    //         // },
    //         onDelete: 'CASCADE'
    //     });
    // };
    User.associate = models => {
        User.hasMany(models.Post);
        User.hasMany(models.Comment);
    };

    return User;
}