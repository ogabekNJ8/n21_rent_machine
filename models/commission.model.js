const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Commission = sequelize.define(
  "commission",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    percent: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      defaultValue: 15.0,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Commission;
