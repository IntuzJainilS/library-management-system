'use strict';
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password1 = await bcrypt.hash("john1234", 10);
    const password2 = await bcrypt.hash("ranveer1234", 10);
    const password3 = await bcrypt.hash("deepika1234", 10);
    const password4 = await bcrypt.hash("arjun1234", 10);
    await queryInterface.bulkInsert('user', [{
      user_id: '73edc429-9c84-4ae4-90f0-d9e9dac91249',
      full_name: 'john doe',
      email: "john@gmail.com",
      password: password1,
      mobile: 123456789,
      gender: 'male',
      birthdate: '2020-12-20',
      usertype: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: '08cebbea-3cab-45b6-9060-d7e16514e88e',
      full_name: 'ranveer singh',
      email: "ranveer@gmail.com",
      password: password2,
      mobile: 987654321,
      gender: 'male',
      birthdate: '2020-1-20',
      usertype: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 'f3acba53-7364-448b-8505-a7b2911ead81',
      full_name: 'deepika padukon',
      email: "deepika@gmail.com",
      password: password3,
      mobile: 123451234,
      gender: 'female',
      birthdate: '2020-2-21',
      usertype: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: '792d0897-82fa-4dbd-a2ea-30bef2156642',
      full_name: 'arjun kapoor',
      email: "arjun@gmail.com",
      password: password4,
      mobile: 101010987,
      gender: 'female',
      birthdate: '2020-10-30',
      usertype: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    
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

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
