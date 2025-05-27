const { Suppliers } = require("../db/models/suppliers");
const { Sequelize } = require("sequelize");
const { getCurrentTime } = require("../utils/currentTime")

class SuppliersController {
  static async getSuppliers() {
    try {
      const suppliers = await Suppliers.findAll();
      return suppliers;
    } catch (error) {
      return {
        status: 500,
        message: "Error al obtener los proveedors.",
        error: error.message,
      };
    }
  }

  static async createSupplier(data) {
    try {
      const currentDateTime = getCurrentTime();
      const newSupplier = await Suppliers.create({
        name: data.name,
        ubication: data.ubication,
        date: currentDateTime,
        phone: data.phone,
        email: data.email,
        ingredient: data.ingredient,
      });

      return {
        status: 201,
        message: "El Proveedor ha sido creado.",
        data: newSupplier,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error con el creación de el proveedor.",
        error: error.message,
      };
    }
  }

  static async editOneSupplier(id, changes) {
    try {
      const supplier = await Suppliers.findByPk(id);
      if (!supplier) {
        return {
          status: 404,
          message: "El Proveedor no existe.",
        };
      }
      await Suppliers.update(
        {
          name: changes.name,
          ubication: changes.ubication,
          date: changes.date,
          phone: changes.phone,
          email: changes.email,
          ingredient: changes.ingredient,
        },
        { where: { id: id} }
      );
      return {
        status: 201,
        message: "El Proveedor ha sido modificado.",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error del servidor al editar el proveedor.",
        error: error.message,
      };
    }
  }

  static async deleteSupplier(id) {
    try {
      const supplier = await Suppliers.findOne({
        where: { id: id},
      });
      if (!supplier) {
        return {
          status: 404,
          message: "El Proveedor no existe",
        };
      }

      await Suppliers.destroy({ where: { id: id } });
      const checkSupplierIsDeleted = await Suppliers.findByPk(supplier.id);
      if (checkSupplierIsDeleted === null) {
        return {
          status: 200,
          message: "El Proveedor ha sido eliminado exitosamente",
        };
      } else {
        throw error;
      }
    } catch (error) {
      return {
        status: 500,
        message: "Error en el servidor al eliminar el Proveedor",
        error: error.message,
      };
    }
  }
}

module.exports = { SuppliersController };
