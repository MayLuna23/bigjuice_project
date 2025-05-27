module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('production', {
      production_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      producto: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      user: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      ubication: {
        type: Sequelize.STRING(100),
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('production');

  },
};
