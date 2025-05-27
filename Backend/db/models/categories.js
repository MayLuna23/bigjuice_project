const sequelize = require("../conection");
const { Sequelize, DataTypes } = require("sequelize");

const Categories = sequelize.define(
  "Categories",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ubication: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

module.exports = { Categories };

