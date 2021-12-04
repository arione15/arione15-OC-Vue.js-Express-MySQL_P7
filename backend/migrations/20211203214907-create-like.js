'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Likes', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID
            },
            postId: {
                allowNull: false,
                type: Sequelize.UUID
            },
            isLike: {
                allowNull: true,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Likes');
    }
};