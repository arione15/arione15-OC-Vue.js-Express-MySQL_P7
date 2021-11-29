'use strict';
const faker = require('faker');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        let comments = [];
        let fakeLikersDislikers = [];

        for (let i = 0; i < 25; i++) {
            comments.push({
                posterId: faker.random.uuid(),
                userId: faker.random.uuid(),
                message: faker.lorem.sentence(),
                likers: fakeLikersDislikers.push(faker.name.findName()),
                dislikers: fakeLikersDislikers.push(faker.name.findName()),
                likes: faker.random.number(),
                dislikes: faker.random.number(),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        };
        await queryInterface.bulkInsert('Comments', comments, {})
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Comments', null, {});
    }
};