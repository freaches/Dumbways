'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project.init({
    title: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    description: DataTypes.TEXT,
    technologies: DataTypes.ARRAY(DataTypes.STRING),
    image: DataTypes.STRING,
    author: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'project',
    timestamps : true,
    createdAt : true,
    updatedAt :'updateTimestamp'
  });
  return project;
};