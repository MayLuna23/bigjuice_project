const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("1111", saltRounds);
    
    return queryInterface.bulkInsert("users", [
      {
        id: "1111",
        name: "Prueba",
        rol: "admin",
        password: hashedPassword,
        ubication: "villa colombia",
        registration_date: "2024-02-15 00:00",
        email: "admin@bigjuice.com",
        phone: "333333",
        address: "Clle 51 # 14 - 11",
        cedula: "123456789",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
