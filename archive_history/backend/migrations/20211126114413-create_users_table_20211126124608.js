'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return [queryInterface.addColumn(
                'Users',
                'gender',
                Sequelize.STRING
            ),
            queryInterface.addColumn(
                'Users',
                'age',
                Sequelize.STRING
            )
        ];
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