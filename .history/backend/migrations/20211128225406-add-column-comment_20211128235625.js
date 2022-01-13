'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }

            },
            posterId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            message: {
                type: Sequelize.TEXT
            },
            likers: {
                type: DataTypes.STRING,
                get() {
                    return this.getDataValue('likers').split(';')
                },
                set(val) {
                    this.setDataValue('likers', val.join(';'));
                },
            },
            dislikers: {
                type: DataTypes.STRING,
                get() {
                    return this.getDataValue('dislikers').split(';')
                },
                set(val) {
                    this.setDataValue('dislikers', val.join(';'));
                },
            },
            likes: {
                type: Sequelize.INTEGER
            },
            dislikes: {
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
        await queryInterface.dropTable('Comments');
    }
};