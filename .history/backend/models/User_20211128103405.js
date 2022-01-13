const Post = require("./Post");
const Comment = require("./Comment");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.hasMany(models.Post);
            models.User.hasMany(models.Comment);
            models.User.hasMany(models.Like);
        }
    }
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
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
    User.associate = function() {
        User.hasMany(Post, {
            foreignKey: user_id,
            //     type: DataTypes.UUID,
            //     allowNull: false
            // },
            onDelete: 'CASCADE'

        });
    };
    Post.associate = function() {
        Post.belongsTo(User, {
            foreignKey: userId,
            //     type: DataTypes.UUID,
            //     allowNull: false
            // },
            onDelete: 'CASCADE'
        });
    };
    User.associate = function() {
        User.hasMany(Comment, {
            foreignKey: user_Id,
            //     type: DataTypes.UUID,
            //     allowNull: false
            // },
            onDelete: 'CASCADE',
        });
    };
    Comment.associate = function() {
        Comment.belongsTo(User, {
            foreignKey: userId,
            //     type: DataTypes.UUID,
            //     allowNull: false
            // },
            onDelete: 'CASCADE'
        });
    };
    return User;
}