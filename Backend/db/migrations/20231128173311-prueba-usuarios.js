module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(100),
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      rol: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ubication: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      registration_date: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cedula: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });

    await queryInterface.createTable("categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ubication: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });

    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sale_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ubication: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      hielo: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      leche: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      leche_polvo: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      azucar: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      pulpa_mora: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue : 0
      },
      pulpa_maracuya: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue : 0
      },
      pulpa_mango: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue : 0
      },
      pulpa_lulo: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue : 0
      },
      pulpa_guanabana: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue : 0
      },
      pulpa_borojo: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue : 0
      },
      saborizante: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      canela: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      miel: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      tarrina: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      pitillo: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      image: {
        type: Sequelize.STRING(100),
        allowNull: true,
      }
    });

    await queryInterface.createTable("ingredients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ubication: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });

    await queryInterface.createTable("sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      products: {
        type: Sequelize.JSON,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("categories");
    await queryInterface.dropTable("products");
    await queryInterface.dropTable("ingredients");
    await queryInterface.dropTable("sales");
  },
};
