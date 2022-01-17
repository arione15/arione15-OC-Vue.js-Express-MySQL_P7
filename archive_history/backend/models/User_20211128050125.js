const User = require("./User")(sequelize, Sequelize);
const Post = require("./Post")(sequelize, Sequelize);
const Comment = require("./Comment")(sequelize, Sequelize);

module.exports = (sequelize, DataTypes) => {
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
    User.associate = function(models) {
        User.hasMany(models.Post, {
            // foreignKey: {
            //     type: DataTypes.UUID,
            //     allowNull: false
            // },
            onDelete: 'CASCADE'
        });
    };
    Post.associate = function() {
        Post.belongsTo(User, {
            // foreignKey: {
            //     type: DataTypes.UUID,
            //     allowNull: false
            // },
            onDelete: 'CASCADE'
        });
    };
    User.associate = function() {
        User.hasMany(Comment, {
            // foreignKey: {
            //     type: DataTypes.UUID,
            //     allowNull: false
            // },
            onDelete: 'CASCADE',
        });
    };
    models.Comment.associate = function(models) {
        models.Comment.belongsTo(User, {
            // foreignKey: {
            //     type: DataTypes.UUID,
            //     allowNull: false
            // },
            onDelete: 'CASCADE'
        });
        return User;
    }
}