'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

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
                    'min': 10,
                    'max': 100
                }),
                videoURL: faker.internet.url(),
                createdAt: new Date(),


                name: faker.name.findName(),
                bio: faker.lorem.sentence(),
                image: faker.image.avatar(),
            };
        };

        const createUsers = (numUsers = 5) => {
            return Array.from({ length: numUsers }, createUser);
        }

        let fakeUsers = createUsers(5);




        let posts = [];

        for (let i = 0; i < 25; i++) {
            let r = Math.random().toString(36).substring(7);
            let pwdHashed = await bcrypt.hash(r, 10);
            //let userRole = roles[(Math.random() * roles.length) | 0];
            let userRole = roles[Math.floor(Math.random() * roles.length)];
            users.push({
                posterId: faker.random.uuid(),
                title: faker.name.lastName(),
                content: faker.internet.email(),
                imageURL: faker.internet.url(),
                videoURL: faker.internet.url(),
                likes: faker.internet.url(),
                dislikes: faker.internet.url(),
                videoURL: faker.internet.url(),
                createdAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('Posts', posts, {})
    },

    down: async(queryInterface, Sequelize) => {

        await queryInterface.bulkDelete('Posts', null, {});

    }
};