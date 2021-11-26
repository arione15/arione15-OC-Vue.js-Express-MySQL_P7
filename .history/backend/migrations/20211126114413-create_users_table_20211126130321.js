'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return [queryInterface.addColumn(
            'users',
            'role', {
                type: Sequelize.DataTypes.STRING,
                defaultValue: false,
                allowNull: false
                type: Sequelize.,
                required: true,
                allowNull: false,
                default: "BASIC"
            }
        )];
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};