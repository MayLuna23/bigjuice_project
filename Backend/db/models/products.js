const sequelize = require("../conection");
const { Sequelize, DataTypes } = require("sequelize");

const Products = sequelize.define(
  "Products",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sale_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ubication: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    hielo: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    leche: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    leche_polvo: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    azucar: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    pulpa_mora: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    pulpa_maracuya: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    pulpa_mango: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    pulpa_lulo: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    pulpa_guanabana: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    pulpa_borojo: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    saborizante: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    canela: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    miel: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    tarrina: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue : 0
    },
    pitillo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue : 0
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true,
    }
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

module.exports = { Products };

