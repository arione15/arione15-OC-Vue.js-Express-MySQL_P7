'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            posterId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Posts',
                    key: 'id'
                }
            },
            title: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.TEXT
            },
            imageUrl: {
                type: Sequelize.STRING
            },
            videoUrl: {
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
        await queryInterface.dropTable('Posts');
    }
};