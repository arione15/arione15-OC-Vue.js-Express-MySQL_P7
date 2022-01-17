'use strict';

const bcrypt = require('bcrypt');

module.exports = {
        up: async(queryInterface, Sequelize) => {
            let r = Math.random().toString(36).substring(7);
            let pwdHashed = await bcrypt.hash(r, 10);
            let roles = ['ADMIN', 'MODER', 'BASIC'];
            //let userRole = roles[(Math.random() * myArray.length) | 0];
            let userRole = roles[Math.floor(Math.random() * array.length)];
            for (let i = 0; i < 25; i++) {
                users.push({
                    name: `new${i}`,
                    firstname: `man${i}`,
                    email: `newman${i}`,
                    password: pwdHashed,
                    role: userRole,
                    //imageUrl: req.body.imageUrl
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            }


            down: async(queryInterface, Sequelize) => {
                await queryInterface.bulkDelete('users', null, {});
            }
        };