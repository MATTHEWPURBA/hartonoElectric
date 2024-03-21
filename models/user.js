"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcryptjs");
//kalau pake package harus di bikin require

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Product, {
        through: models.Cart,
        foreignKey: "Userid",
        otherKey: "ProductId",
      });
      User.hasOne(models.UserProfile, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          //di before create pasti harus ada instance dan options
          console.log(instance, "ini before create");
          const salt = bcrypt.genSaltSync(8);
          /** ini adalah persiapan bumbu untuk sistem hash */
          const hash = bcrypt.hashSync(instance.password, salt);
          // ini adalah proses penambahan garam di dalam
          /** sebuah instance password */
          instance.password = hash; 
          /** ini adalah restructure untuk mengubah
           * password menjadi hasil olahaan penambahan garam dan bumbu
           */
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};