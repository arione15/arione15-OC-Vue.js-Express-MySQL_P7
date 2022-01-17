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
            likers: {
                type: Sequelize.STRING,
                get() {
                    return this.getDataValue('likers').split(';')
                },
                set(val) {
                    this.setDataValue('likers', val.join(';'));
                },
                required: true
            },
            dislikers: {
                type: Sequelize.STRING,
                get() {
                    return this.getDataValue('dislikers').split(';')
                },
                set(val) {
                    this.setDataValue('dislikers', val.join(';'));
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
        await queryInterface.dropTable('Posts');
    }
};