'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('issued_books', [{
      id: '1eef0a19-2261-4f92-94c1-26a27ac6970d',
      user_id:'73edc429-9c84-4ae4-90f0-d9e9dac91249',
      book_id:"10910090-cebc-46ab-9074-1e4a5f45b5b1",
      // issued_date: Date.now(),
    },
    {
      id:'cba2b118-6500-4250-bfd6-065ee27a63ff',
      user_id:'73edc429-9c84-4ae4-90f0-d9e9dac91249',
      book_id:"52c1cc11-51ba-43f2-b802-f963247864e4",
      // issued_date: Date.now(),
    }
  ]
)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('issued_books', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
