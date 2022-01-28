'use strict';

module.exports = {
        up: async(queryInterface, Sequelize) => {
            await queryInterface.bulkInsert('users', [{
                        name: 'new01',
                        firstName: 'man01',
                        email: 'newman01@example.com',
                        password: 'abc123?!',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }, {

                        name: 'new01',
                        firstName: 'man01',
                        email: 'newman01@example.com',
                        password: 'abc123?!',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        name: 'new01',
                        firstName: 'man01',
                        email: 'newman01@example.com',
                        password: 'abc123?!',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        name: 'new01',
                        firstName: 'man01',
                        email: 'newman01@example.com',
                        password: 'abc123?!',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        name: 'new01',
                        firstName: 'man01',
                        email: 'newman01@example.com',
                        password: 'abc123?!',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    ]);
                },

                down: async(queryInterface, Sequelize) => {
                    /**
                     * Add commands to revert seed here.
                     *
                     * Example:
                     * await queryInterface.bulkDelete('People', null, {});
                     */
                }
        };