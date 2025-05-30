const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Contract = require("./contract.model");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    contractId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Contract.hasMany(Payment, { foreignKey: "contractId" });
Payment.belongsTo(Contract, { foreignKey: "contractId" });

module.exports = Payment;
