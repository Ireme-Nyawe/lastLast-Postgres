'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {



      await queryInterface.bulkInsert('posts', [{
        id:1,
        image: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
        title: 'Lorem Ipsum',
        header: 'test',
        category: "testing",
        description: 'we are doing test',
        user: 1,
        createdAt:new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('posts', null, {});

  }
};
