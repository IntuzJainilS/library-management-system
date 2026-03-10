'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('books', [{
      id: '52c1cc11-51ba-43f2-b802-f963247864e4',
      title: 'demo-book',
      authorname: 'demo-user',
      quantity: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
       id: '10910090-cebc-46ab-9074-1e4a5f45b5b1',
      title: 'Little Women',
      authorname: 'Louisa May Alcott',
      quantity: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '7a7ff32f-1568-4fef-b389-68cae43f0e15',
      title: 'Red Rising',
      authorname: 'Pierce Brown',
      quantity: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
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
     await queryInterface.bulkDelete('books', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
