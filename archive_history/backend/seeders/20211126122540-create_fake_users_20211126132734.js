'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('users', [{
            name: 'user01',
            isBetaMember: false *
        }], {});
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};