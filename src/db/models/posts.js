'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      posts.belongsTo(models.users, {
        foreignKey: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'poster',
      });
    
      posts.hasMany(models.comments, {
        foreignKey: 'post',
      });
    }
  }
  posts.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    header: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    user: DataTypes.INTEGER,
    views: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};