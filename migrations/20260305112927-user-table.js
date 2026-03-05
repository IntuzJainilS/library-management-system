'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      user_id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.DataTypes.STRING,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.DataTypes.STRING,

      },
      mobile: {
        type: Sequelize.DataTypes.INTEGER,
      },
      gender: {
        type: Sequelize.DataTypes.ENUM('Male', 'female'),
      },
      birthdate: {
        type: Sequelize.DataTypes.DATE,
        validate: {
          isDate: true
        }
      },
      usertype: {
        type: Sequelize.DataTypes.ENUM('Admin', 'User'),
        defaultValue: 'User',
      },
      status: {
        type: Sequelize.DataTypes.ENUM('Active', 'Inactive')
      },
       createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
