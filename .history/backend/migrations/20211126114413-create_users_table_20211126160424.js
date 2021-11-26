'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return [queryInterface.addColumn(
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
        // /**
        //  * Add reverting commands here.
        //  *
        //  * Example:
        //  * await queryInterface.dropTable('users');
        //  */
    }
};