'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
        class User extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                // define association here
            }
        };
        User.init({
                firstName: {
                    type: DataTypes.STRING,
                },
                familyName: {
                    type: DataTypes.STRING,
                },
                email: {
                    type: DataTypes.STRING,
                },
                password: {
                    type: DataTypes.STRING,
                },
                role: {
                    type: DataTypes.STRING,
                },
                photoUrl: {
                    type: DataTypes.STRING
                },
                {
                    sequelize,
                    modelName: 'User',
                });
            return User;
        };
        module.exports = (sequelize, DataTypes) => {

            const User = sequelize.define('User', {
                // id: {
                //     type: DataTypes.UUID,
                //     defaultValue: DataTypes.UUIDV4,
                //     primaryKey: true,
                //     allowNull: false
                // },
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
                photoUrl: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                role: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    default: "BASIC"
                }
            });

            User.associate = models => {
                User.hasMany(models.Post, {
                    as: "posts",
                    foreignKey: "userId"
                });
                User.hasMany(models.Comment, {
                    as: "comments",
                    foreignKey: "userId"
                });
            };

            return User;
        }