const { Production } = require("../db/models/production");
const { IngredientsController } = require("./ingredients.controller");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const { getCurrentTime } = require("../utils/currentTime");

class ProductionController {
  static async getProduction(initialDate, finalDate, ubication) {
    try {
      const dataProduction = await Production.findAll({
        where: {
          date: {
            [Op.between]: [`${initialDate} 00:00`, `${finalDate} 23:59`],
          },
          ubication: ubication,
        },
      });
      return dataProduction;
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener los datos de produccion.",
        error: error.message,
      };
    }
  }

  static async createProduction(data, user) {
    try {
      const currentDateTime = getCurrentTime();
      const newProduction = await Production.create({
        product: data.name,
        quantity: data.quantity,
        date: currentDateTime,
        user: user.user,
        ubication: user.ubication,
      });

      return {
        status: 201,
        message: "La produccion ha sido registrada.",
        data: newProduction,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Error con la creación del registro de produccion",
        error: error.message,
      };
    }
  }

  static async editOneBill(id, changes) {
    try {
      const bill = await Production.findByPk(id);
      if (!bill) {
        return {
          status: 404,
          message: "La compra no existe.",
        };
      }
      await Production.update(
        {
          name: changes.name,
          amount: changes.amount,
          ubication: changes.ubication,
          date: changes.date,
          user: changes.user,
          user_id: changes.user_id,
          description: changes.description,
        },
        { where: { id: id } }
      );
      return {
        status: 200,
        message: "La compra ha sido modificado.",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error del servidor al editar la compra",
        error: error.message,
      };
    }
  }

  static async deleteBill(id) {
    try {
      const bill = await Production.findOne({
        where: { id: id },
      });
      if (!bill) {
        return {
          status: 404,
          message: "La compra no existe",
        };
      }

      await Production.destroy({ where: { id: id } });
      const checkBillIsDeleted = await Production.findByPk(bill.id);
      if (checkBillIsDeleted === null) {
        return {
          status: 200,
          message: "La compra ha sido eliminado exitosamente",
        };
      } else {
        throw error;
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error en el servidor al eliminar la compra",
        error: error.message,
      };
    }
  }

  static async deleteProduction(id, data) {
    try {
      const prod = await Production.findOne({
        where: { id: id },
      });
      if (!prod) {
        return {
          status: 404,
          message: "La produccion no existe",
        };
      }

      await prod.destroy();
      const checkProdIsDeleted = await Production.findByPk(Production.id);
      if (checkProdIsDeleted === null) {
        const restoreIngredients = await IngredientsController.restoreIngredientsDeleteProduction(data);
        if (restoreIngredients.status === 200) {
          return {
            status: 200,
            message: "La produccion ha sido eliminado exitosamente",
          };
        } else {
          return {
            status: 500,
            message: "Error al restaurar los ingredientes",
            error: restoreIngredients.error,
          };
        }
      } else {
        throw error;
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: "Error en el servidor al eliminar La produccion",
        error: error.message,
      };
    }
  }

  static async restoreIngredients(data) {
    try {
      //product quantity
      
    } catch (error) {
      
    }
  }

  static async totalProduction(initialDate, finalDate, ubication) {
    let totalProduction = 0;
    try {
      const dataProduction = await Production.findAll({
        where: {
          date: {
            [Op.between]: [
              new Date(`${initialDate} 00:00`),
              new Date(`${finalDate} 23:59`),
            ],
          },
          ubication: ubication,
        },
      });

      dataProduction.forEach((sale) => {
        totalProduction += sale.amount;
      });

      return {
        status: 200,
        data: totalProduction,
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error en el cálculo de la venta total: ${error}`,
      };
    }
  }
}

module.exports = { ProductionController };
