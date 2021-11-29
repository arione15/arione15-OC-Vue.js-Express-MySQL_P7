'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        let posts = [];
        let fakeLikers = [];
        const createLikerDisliker = () => {
            return {
                name: faker.name.findName()
            };
        };
        const createLikers = (numLikers = 25) => {
            return Array.from({ length: numLikers }, createLiker);
        };
        fakeLikers = createLikers(25);

        for (let i = 0; i < 25; i++) {
            posts.push({
                posterId: faker.random.uuid(),
                title: faker.lorem.sentence(),
                content: faker.lorem.sentence(),
                imageUrl: faker.image.city(),
                videoURL: faker.image.nature(),
                //videoURL: `${faker.image.nature()}?random=${Date.now()}`,
                likers: fakeLikers,
                dislikers: fakeLikers,
                likes: faker.random.number(),
                dislikes: faker.random.number(),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        };
        await queryInterface.bulkInsert('Posts', posts, {})
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Posts', null, {});
    }
};