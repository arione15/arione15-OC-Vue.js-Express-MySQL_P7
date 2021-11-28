'use strict';

const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        let users = [];
        let roles = ['ADMIN', 'MODER', 'BASIC'];

        for (let i = 0; i < 25; i++) {
            let r = Math.random().toString(36).substring(7);
            let pwdHashed = await bcrypt.hash(r, 10);
            //let userRole = roles[(Math.random() * roles.length) | 0];
            let userRole = roles[Math.floor(Math.random() * roles.length)];
            users.push({
                firstName: faker.name.firstName(),
                familyName: faker.name.lastName(),
                ,
                email: `newman${i}`,
                password: pwdHashed,
                role: userRole,
                photoUrl: req.body.imageUrl
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        await queryInterface.bulkInsert('Users', users, {})
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};