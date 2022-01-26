'use strict';
const  { hashPassword } = require('../helpers/bcrpyt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Location, {
        through: models.Favourite,
        foreignKey: UserId
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: { msg: 'Email is required' },
        isEmail: { msg: 'Email Format is invalid!' }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: { msg: 'Username is required' },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Password is required' },
        len: {
          args: [8,24],
          msg: 'Password should be 8 to 24 characters long' 
        }
      }
    },
    fullname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Username is required' },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  //Hooks to hash password
  User.beforeCreate(async (user, option)  => {
    const hashedPass = await hashPassword(user.password);
    user.password = hashedPass
  })

  return User;
};