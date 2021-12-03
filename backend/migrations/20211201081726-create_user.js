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
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING
            },
            photoUrl: {
                type: Sequelize.STRING
            },
            dislikers: {
                type: Sequelize.STRING,
                get() {
                    return this.getDataValue('dislikers');
                },
                set(val) {
                    this.setDataValue('dislikers', dislikers.push(val));
                },
                required: true
            },
            likes: {
                type: Sequelize.INTEGER,
                default: 0
            },
            dislikes: {
                type: Sequelize.INTEGER,
                default: 0
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