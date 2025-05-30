const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Machine = require("./machine.model");
const User = require("./user.model");
const Status = require("./status.model");
const Commission = require("./commission.model");

const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    machineId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    commissionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Machine.hasMany(Contract);
Contract.belongsTo(Machine);

User.hasMany(Contract);
Contract.belongsTo(User);

Status.hasMany(Contract);
Contract.belongsTo(Status);

Commission.hasMany(Contract);
Contract.belongsTo(Commission);

module.exports = Contract;
