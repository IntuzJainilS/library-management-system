'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('issued_books',{
       id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV4,
              primaryKey: true
          },
          user_id: {
              type: Sequelize.UUID,
              references: {
                  model: "user",
                  key: "user_id"
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
          },
          book_id: {
              type: Sequelize.UUID,
              references: {
                  model: "books",
                  key: "id"
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
          },
          deleted_at: {
              type: Sequelize.DATE,
              allowNull: true,
          }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('issued_books')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
