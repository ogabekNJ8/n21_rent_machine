const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");
const Region = require("./region.model");
const District = require("./district.model");
const Category = require("./category.model");

const Machine = sequelize.define(
  "machine",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price_per_hour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    regionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    districtId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    min_hour: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    min_price: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, 
  }
);

User.hasMany(Machine);
Machine.belongsTo(User);

Region.hasMany(Machine);
Machine.belongsTo(Region);

District.hasMany(Machine);
Machine.belongsTo(District);

Category.hasMany(Machine);
Machine.belongsTo(Category);

module.exports = Machine;
