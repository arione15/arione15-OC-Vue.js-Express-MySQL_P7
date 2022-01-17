'use strict';

module.exports = {
        up: async(queryInterface, Sequelize) => {
            await queryInterface.bulkInsert('users', [{
                    name: 'new01',
                    firstName: 'man01',
                    email: 'newman01@example.com',
                    password: 'Abc123?!',
                    role: 'ADMIN',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'new02',
                    firstName: 'man02',
                    email: 'newman02@example.com',
                    password: 'aBc123?!',
                    role: 'BASIC',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: '
                    new01 ',
                    firstName: 'man01',
                    email: 'newman01@example.com',
                    password: 'abc123?!',
                    createdAt: new Date(),
                    updatedAt: new Date(),

                }, {}
                name: 'new01',
                firstName: 'man01',
                email: 'newman01@example.com',
                password: 'abc123?!',
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                name: 'new01',
                firstName: 'man01',
                email: 'newman01@example.com',
                password: 'abc123?!',
                createdAt: new Date(),
                updatedAt: new Date()
            }]);
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