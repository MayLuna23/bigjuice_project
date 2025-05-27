const { Categories } = require("../db/models/categories");
const { Sequelize } = require("sequelize");

class CategoriesController {
  static async getCategories() {
    try {
      const categories = await Categories.findAll();
      return categories;
    } catch (error) {
      return {
        status: 500,
        message: `Error al obtener los categorias: ${error.message}.`,
      };
    }
  }

  static async createCategory(data) {
    try {
      const categoryDoesExist = await Categories.findOne({
        where: { name: data.name },
      });
      if (categoryDoesExist) {
        return {
          status: 409,
          message: "La Categoria ya existe.",
        };
      }
      const newCategory = await Categories.create({
        name: data.name,
        ubication: data.ubication,
      });

      return {
        status: 201,
        message: "La Categoria ha sido creado.",
        data: newCategory,
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error con la creación de la categoria: ${error.message}.`,
      };
    }
  }

  static async editOneCategory(id, changes) {
    try {
      const category = await Categories.findByPk(id);
      if (!category) {
        return {
          status: 404,
          message: "La Categoria no existe.",
        };
      }
      await Categories.update(
        {
          name: changes.name,
          ubication: changes.ubication,
        },
        { where: { id: id} }
      );
      return {
        status: 200,
        message: "La Categoria ha sido modificado.",
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error del servidor al editar el categoria ${error.message}.`,
      };
    }
  }

  static async deleteCategory(id) {
    try {
      const category = await Categories.findOne({
        where: { id: id},
      });
      if (!category) {
        return {
          status: 404,
          message: "La Categoria no existe",
        };
      }

      await Categories.destroy({ where: { id: id } });
      const checkCategoryIsDeleted = await Categories.findByPk(category.id);
      if (checkCategoryIsDeleted === null) {
        return {
          status: 200,
          message: "La Categoria ha sido eliminado exitosamente",
        };
      } else {
        throw error;
      }
    } catch (error) {
      return {
        status: 500,
        message: `Error en el servidor al eliminar el Categoria: ${error.message}`,
      };
    }
  }
}

module.exports = { CategoriesController };
