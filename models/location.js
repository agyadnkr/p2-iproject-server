'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Location.belongsToMany(models.User, {
        through: models.Favourite,
        foreignKey: 'LocationId'
      })
      Location.hasMany(models.Image, {
        foreignKey: 'LocationId',
        sourceKey:  'id'
      })
    }
  };
  Location.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    lattitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    mapsUrl: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Price is required' },
        notNull: { msg: 'Price is required' },
      }
    }
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};