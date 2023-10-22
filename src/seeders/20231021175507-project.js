'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('projects', [{
        title: "Makan apps",
        description : "makan mukbang bareng banteng merah",
        image : "image.jpg",
        start_date : new Date(),
        end_date : "2023-12-13",
        technologies : ["Node Js", "React Js", "Next Js", "Type Script"],
        createdAt : new Date(),
        updatedAt : new Date()
       },{
        title: "Minum apps",
        description : "Minum mukbang bersama real madrid",
        image : "image.jpg",
        start_date : new Date(),
        end_date : "2024-2-13",
        technologies : ["Node Js", "Type Script"],
        createdAt : new Date(),
        updatedAt : new Date()
       }], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('projects', null, {});
  }
};
