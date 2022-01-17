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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            //required: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            //required: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //required: true,
            unique: {
                msg: "L'adresse email est déjà prise. Choisissez-en une autre !"
            }
        },
        password: {
            type: DataTypes.STRING,
            //required: true,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            default: "BASIC"
        },
        // imageUrl: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // },
        //timestamps: true
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
        User.hasOne(models.Post);
    };

    return User;
}