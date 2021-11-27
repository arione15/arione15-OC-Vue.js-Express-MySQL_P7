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
                role: 'MODER',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'new03',
                firstName: 'man0',
                email: 'newman03@example.com',
                password: 'abC123?!',
                role: 'BASIC',
                createdAt: Date.now(),
                updatedAt: Date.(),
            },
            {
                name: 'new04',
                firstName: 'man04',
                email: 'newman04@example.com',
                password: 'abcD123?!',
                role: 'BASIC',
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                name: 'new05',
                firstName: 'man05',
                email: 'newman05@example.com',
                password: 'abcE123?!',
                role: 'BASIC',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};