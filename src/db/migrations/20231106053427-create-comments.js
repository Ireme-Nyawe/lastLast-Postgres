'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commentBody: {
        type: Sequelize.STRING
      },
      post: {
        type: Sequelize.INTEGER,
        references:{
          model:'posts',
          key: 'id',
          as: 'forpost'
        },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
      },
      user: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key: 'id',
          as: 'commenter'
        },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};