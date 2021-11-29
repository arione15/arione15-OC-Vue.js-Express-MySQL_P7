'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        let posts = [];
        let fakeLikers = [];
        const createLiker = () => {
            return {
                name: faker.name.findName()
            };
        };
        const createLikers = (numLikers = 25) => {
            return Array.from({ length: numLikers }, createLiker);
        };
        let fakeLikers = createLikers(25);

        for (let i = 0; i < 25; i++) {
            posts.push({
                posterId: faker.random.uuid(),
                title: faker.lorem.sentence(),
                content: faker.lorem.sentence(),
                imageUrl: faker.image.city(),
                videoURL: `${faker.image.nature()}?random=${Date.now()}`,
                likes: faker.datatype.number({
                    'min': 0,
                    'max': 100
                }),
                dislikes: faker.datatype.number({
                    'min': 0,
                    'max': 100
                }),
                likers: fakeLikers,
                dislikers: fakeLikers,
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