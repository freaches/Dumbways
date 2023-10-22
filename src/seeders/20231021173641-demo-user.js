'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
         name: 'John Doe',
         email : "hh@gmail.com",
         password : "root",
         createdAt:"2023-10-17",
         updatedAt : "2023-10-17"
       },{
        name: 'John Doe',
        email : "hh@gmail.com",
        password : "root,",
        createdAt:"2023-10-17",
        updatedAt : "2023-10-17"
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
