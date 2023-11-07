'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comments.belongsTo(models.posts, {
        foreignKey: 'post',
        as: 'forpost', // alias for the Post model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    
      comments.belongsTo(models.users, {
        foreignKey: 'user',
        as: 'commenter', // alias for the User model
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  comments.init({
    commentBody: DataTypes.STRING,
    post: DataTypes.INTEGER,
    user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};