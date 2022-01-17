'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

        await queryInterface.bulkInsert('Post', [{
            name: 'John Doe',
            isBetaMember: false
        }], {});
    },

    down: async(queryInterface, Sequelize) => {

        await queryInterface.bulkDelete('Post', null, {});

    }
};