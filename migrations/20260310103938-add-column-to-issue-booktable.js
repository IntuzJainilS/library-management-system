'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('issued_books', 'createdAt', {
      type: Sequelize.DATE,
      after:'return_date'
    })

    await queryInterface.addColumn('issued_books', 'updatedAt', {
      type: Sequelize.DATE,
      after:'createdAt'
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('issued_books', 'createdAt');
     await queryInterface.removeColumn('issued_books', 'updatedAt');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
