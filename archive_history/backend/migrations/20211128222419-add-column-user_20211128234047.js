'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING
            },
            familyName: {
                type: Sequelize.STRING
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "L'adresse email est déjà prise. Choisissez-en une autre !"
                }
            },
            password: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
                default: "BASIC"
            },
            photoUrl: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};