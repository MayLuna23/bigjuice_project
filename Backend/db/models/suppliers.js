const sequelize = require("../conection");
const { Sequelize, DataTypes } = require("sequelize");

const Suppliers = sequelize.define(
  "Suppliers",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ubication: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ingredient: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "suppliers",
    timestamps: false,
  }
);

module.exports = { Suppliers };
