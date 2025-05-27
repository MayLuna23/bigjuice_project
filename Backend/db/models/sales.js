const sequelize = require("../conection");
const { Sequelize, DataTypes } = require("sequelize");

const Sales = sequelize.define(
  "Sales",
  {
    ubication: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    rappi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue : false
    },
    nequi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue : false
    },
    products: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
  },
  {
    tableName: "sales",
    timestamps: false,
  }
);

module.exports = { Sales };
