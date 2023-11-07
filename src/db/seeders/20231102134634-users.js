'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {



      await queryInterface.bulkInsert('users', [{
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'example@example.com',
        password: 'qwerty',
        profile: "https://res.cloudinary.com/ddlzcnyhe/image/upload/v1699259434/jyrnlb690xzg6xqtrx21.jpg",
        createdAt:new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('users', null, {});

  }
};
