const sequelize = require("../conection");
const { Sequelize, DataTypes } = require("sequelize");

const Production = sequelize.define(
  "Production",
  {
    product: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    ubication: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  },
  {
    tableName: "production",
    timestamps: false,
  }
);

module.exports = { Production };

