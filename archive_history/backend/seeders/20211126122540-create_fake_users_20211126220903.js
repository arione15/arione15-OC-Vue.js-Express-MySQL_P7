'use strict';

const bcrypt = require('bcrypt');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        let r = Math.random().toString(36).substring(7);
        let pwdHashed = await bcrypt.hash(r, 10);
        let roles = ['ADMIN', 'MODER', '']
        for (let i = 0; i < 25; i++) {
            users.push({
                name: `new${i}`,
                firstname: `man${i}`,
                email: `newman${i}`,
                password: pwdHashed,
                role: req.body.role,
                //imageUrl: req.body.imageUrl

            })
        }







        const users = [];
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
                updatedAt: new Date()
            },
            {
                name: 'new03',
                firstName: 'man0',
                email: 'newman03@example.com',
                password: 'abC123?!',
                role: 'BASIC',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'new04',
                firstName: 'man04',
                email: 'newman04@example.com',
                password: 'abcD123?!',
                role: 'BASIC',
                createdAt: Sequelize.fn('NOW'),
                createdAt: new Date(),
                updatedAt: new Date()
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