'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
      UserProfile.belongsTo(models.User)
    }
  }
  UserProfile.init({
    fullName: DataTypes.STRING,
    profilePicture: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    dateOfBirth: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};