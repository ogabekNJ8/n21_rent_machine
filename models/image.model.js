const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Machine = require("./machine.model");

const Image = sequelize.define(
  "image",
  {
    id: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    uploaded_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    machineId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Image.belongsTo(Machine)
Machine.hasMany(Image)

module.exports = Image;
