'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return [queryInterface.addColumn(
            'users',
            'role', {
                type: Sequelize.STRING
            }
            Sequelize.STRING
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