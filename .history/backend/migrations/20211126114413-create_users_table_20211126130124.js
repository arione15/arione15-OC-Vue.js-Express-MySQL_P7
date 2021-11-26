'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return [queryInterface.addColumn(
            'users',
            'role', {
                type: Sequelize.STRING,
                //type: DataTypes.STRING,
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