const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const UserAddress = sequelize.define(
  "user_address",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(UserAddress);
UserAddress.belongsTo(User);

module.exports = UserAddress;
