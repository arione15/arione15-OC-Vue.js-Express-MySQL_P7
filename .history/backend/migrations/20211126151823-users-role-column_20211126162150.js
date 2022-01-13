'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await [queryInterface.addColumn(
            'users',
            'role', {
                type: Sequelize.DataTypes.STRING,
                defaultValue: "BASIC",
                allowNull: false,
                required: true
            }
        )];
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};