'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {



      await queryInterface.bulkInsert('comments', [{
        commentBody: 'well done',
        post: 1,
        user: 1,
        createdAt:new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('comments', null, {});

  }
};
