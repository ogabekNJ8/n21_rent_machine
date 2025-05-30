const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");
const Machine = require("./machine.model");

const Review = sequelize.define(
  "review",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    machineId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(Review);
Review.belongsTo(User);

Machine.hasMany(Review);
Review.belongsTo(Machine);

module.exports = Review;
