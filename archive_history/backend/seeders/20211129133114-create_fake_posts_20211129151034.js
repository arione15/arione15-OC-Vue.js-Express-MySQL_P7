'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        let posts = [];

        const createPost = () => {
            return {
                posterId: faker.random.uuid(),
                title: faker.lorem.sentence(),
                content: faker.lorem.sentence(),
                imageURL: faker.internet.url(),
                videoURL: faker.internet.url(),
                likes: faker.datatype.number({
                    'min': 0,
                    'max': 100
                }),
                dislikes: faker.datatype.number({
                    'min': 0,
                    'max': 100
                }),
                videoURL: faker.internet.url(),
                createdAt: new Date(),
                updatedAt: new Date(),

            };
        };

        const createPosts = (numPosts = 25) => {
            return Array.from({ length: numPosts }, createPost);
        };
        let fakePosts = createPosts(25);

        await queryInterface.bulkInsert('Posts', posts, {})
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Posts', null, {});

    }
};