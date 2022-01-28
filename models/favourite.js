'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favourite.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
      Favourite.belongsTo(models.Location, {
        foreignKey: 'LocationId'
      })
    }
  };
  Favourite.init({
    UserId: DataTypes.INTEGER,
    LocationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};