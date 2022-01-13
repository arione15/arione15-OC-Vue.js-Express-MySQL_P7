'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        let posts = [];

        for (let i = 0; i < 25; i++) {
            let r = Math.random().toString(36).substring(7);
            let pwdHashed = await bcrypt.hash(r, 10);
            //let userRole = roles[(Math.random() * roles.length) | 0];
            let userRole = roles[Math.floor(Math.random() * roles.length)];
            users.push({
                posterId: faker.name.uuid(),
                familyName: faker.name.lastName(),
                email: faker.internet.email(),
                password: pwdHashed,
                role: userRole,
                photoUrl: faker.internet.url(),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        await queryInterface.bulkInsert('Posts', posts, {})
    },

    down: async(queryInterface, Sequelize) => {

        await queryInterface.bulkDelete('Posts', null, {});

    }
};