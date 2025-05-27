const sequelize = require("../conection");
const { Sequelize, DataTypes } = require("sequelize");

const Bills = sequelize.define(
  "Bills",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
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
    user: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    elements: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "bills",
    timestamps: false,
  }
);

module.exports = { Bills };

