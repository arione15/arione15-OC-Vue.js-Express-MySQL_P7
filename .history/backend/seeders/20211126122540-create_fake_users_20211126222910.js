'use strict';

const bcrypt = require('bcrypt');
let users = [];
let r = Math.random().toString(36).substring(7);
let pwdHashed = bcrypt.hash(r, 10);
let roles = ['ADMIN', 'MODER', 'BASIC'];
let userRole = roles[(Math.random() * roles.length) | 0];
//let userRole = roles[Math.floor(Math.random() * roles.length)];

module.exports = {
    up: async(queryInterface, Sequelize) => {
        for (let i = 0; i < 25; i++) {
            users.push({
                name: `new${i}`,
                firstname: `man${i}`,
                email: `newman${i}`,
                password: await pwdHashed,
                role: userRole,
                //imageUrl: req.body.imageUrl
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        await queryInterface.bulkInsert('users', users, {})
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};