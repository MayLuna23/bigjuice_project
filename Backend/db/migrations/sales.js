module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ubication: {
        type: Sequelize.STRING(100),
        allowNull: false,
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
      rappi: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue : false
      },
      nequi: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue : false
      },
      products: {
        type: Sequelize.JSON,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales');

  },
};
