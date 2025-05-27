const { Products } = require("../db/models/products");
const { Sequelize } = require("sequelize");
const { IngredientsController } = require("./ingredients.controller");
const path = require("path");
const fs = require("fs");

class ProductsController {
  static async getProducts() {
    try {
      const products = await Products.findAll();
      return products;
    } catch (error) {
      return {
        status: 500,
        message: `Error al obtener los productos: ${error.message}.`,
      };
    }
  }

  static async createProduct(data, image) {
    try {
      const productDoesExist = await Products.findOne({
        where: { name: data.name, ubication: data.ubication },
      });
      if (productDoesExist) {
        return {
          status: 409,
          message: "El Producto ya existe.",
        };
      }

      const newProduct = await Products.create({
        name: data.name.toLowerCase(),
        quantity: data.quantity,
        sale_price: data.sale_price,
        category: data.category,
        ubication: data.ubication,
        hielo: data.hielo,
        leche: data.leche,
        leche_polvo: data.leche_polvo,
        azucar: data.azucar,
        pulpa_mora: data.pulpa_mora,
        pulpa_lulo: data.pulpa_lulo,
        pulpa_maracuya: data.pulpa_maracuya,
        pulpa_guanabana: data.pulpa_guanabana,
        pulpa_borojo: data.pulpa_borojo,
        pulpa_mango: data.pulpa_mango,
        saborizante: data.saborizante,
        canela: data.canela,
        miel: data.miel,
        tarrina: data.tarrina,
        pitillo: data.pitillo,
        image: image.filename,
      });

      const imagePath = path.join(
        __dirname,
        "../uploads/images",
        image.filename
      );
      fs.renameSync(image.path, imagePath);

      return {
        status: 201,
        message: "El Producto ha sido creado.",
        data: newProduct,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: `Error con la creación del producto.`,
        error: error.message,
      };
    }
  }

  static async editOneProduct(id, changes, image) {
    try {
      const product = await Products.findByPk(id);
      if (!product) {
        return {
          status: 404,
          message: "El Producto no existe.",
        };
      }

      const updateData = {
        name: changes.name.toLowerCase(),
        quantity: changes.quantity,
        sale_price: changes.sale_price,
        category: changes.category,
        ubication: changes.ubication,
        hielo: changes.hielo,
        leche: changes.leche,
        leche_polvo: changes.leche_polvo,
        azucar: changes.azucar,
        pulpa_mora: changes.pulpa_mora,
        pulpa_lulo: changes.pulpa_lulo,
        pulpa_maracuya: changes.pulpa_maracuya,
        pulpa_guanabana: changes.pulpa_guanabana,
        pulpa_borojo: changes.pulpa_borojo,
        pulpa_mango: changes.pulpa_mango,
        canela: changes.canela,
        miel: changes.miel,
        tarrina: changes.tarrina,
        pitillo: changes.pitillo,
      };

      if (image) {
        updateData.image = image.filename;
        const imagePath = path.join(
          __dirname,
          "../uploads/images",
          image.filename
        );
        await fs.promises.rename(image.path, imagePath);

      }

      await Products.update(updateData, { where: { id: id } });
      return {
        status: 200,
        message: "El Producto ha sido modificado exitosamente.",
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Error del servidor al editar el producto.',
        error: error.message,
      };
    }
  }

  // static async editOneProduct(id, changes, image) {
  //   try {
  //     const product = await Products.findByPk(id);
  //     if (!product) {
  //       return {
  //         status: 404,
  //         message: "El Producto no existe.",
  //       };
  //     }
  //     await Products.update(
  //       {
  //         name: changes.name.toLowerCase(),
  //         quantity: changes.quantity,
  //         sale_price: changes.sale_price,
  //         category: changes.category,
  //         ubication: changes.ubication,
  //         hielo: changes.hielo,
  //         leche: changes.leche,
  //         leche_polvo: changes.leche_polvo,
  //         azucar: changes.azucar,
  //         pulpa_mora: changes.pulpa_mora,
  //         pulpa_lulo: changes.pulpa_lulo,
  //         pulpa_maracuya: changes.pulpa_maracuya,
  //         pulpa_guanabana: changes.pulpa_guanabana,
  //         pulpa_borojo: changes.pulpa_borojo,
  //         pulpa_mango: changes.pulpa_mango,
  //         canela: changes.canela,
  //         miel: changes.miel,
  //         tarrina: changes.tarrina,
  //         pitillo: changes.pitillo,
  //         image: image.filename,
  //       },
  //       { where: { id: id } }
  //     );

  //     const imagePath = path.join(__dirname, '../uploads/images', imagen.filename);
  //     fs.renameSync(image.path, imagePath);

  //     return {
  //       status: 200,
  //       message: "El Producto ha sido modificado exitosamente.",
  //     };
  //   } catch (error) {
  //     return {
  //       status: 500,
  //       message: `Error del servidor al editar el producto ${error.message}.`,
  //     };
  //   }
  // }

  static async deleteProduct(id) {
    try {
      const product = await Products.findOne({ where: { id: id } });
      if (!product) {
        return {
          status: 404,
          message: "El Producto no existe",
        };
      }

      await Products.destroy({ where: { id: id } });
      const checkProductIsDeleted = await Products.findByPk(id);
      if (checkProductIsDeleted === null) {
        return {
          status: 200,
          message: "El Producto ha sido eliminado exitosamente",
        };
      } else {
        throw error;
      }
    } catch (error) {
      return {
        status: 500,
        message: `Error en el servidor al eliminar el producto: ${error.message}`,
      };
    }
  }

  static async discountStock(productsToSell, ubication) {
    try {
      // Bucle for para validar stock del producto
      for (const product of productsToSell) {
        const productName = product.name;
        const quantitySold = product.quantity;

        const productDoesExist = await Products.findOne({
          where: { name: productName, ubication: ubication },
        });

        if (productDoesExist === null) {
          throw new Error(
            `El producto ${productName.toUpperCase()} no existe.`
          );
        }

        if (productDoesExist.quantity === 0) {
          throw new Error(
            `El producto ${productName.toUpperCase()} está agotado.`
          );
        }

        if (quantitySold > productDoesExist.quantity) {
          throw new Error(
            `No hay suficiente cantidad de ${productName.toUpperCase()} para realizar esta venta.`
          );
        }
      }
      // Si el stock esta OK se procede al descuento del inventario
      for (const product of productsToSell) {
        const productName = product.name;
        const quantitySold = product.quantity;

        Products.update(
          { quantity: Sequelize.literal(`quantity - ${quantitySold}`) },
          { where: { name: productName, ubication: ubication } }
        );
      }

      return {
        status: 200,
        message: "Todos los productos han sido actualizados correctamente.",
      };
    } catch (error) {
      return {
        status: 404,
        message: `Error al actualizar los productos`,
        error: error.message,
      };
    }
  }

  // Esta se usa cuando se registra la produccion de jugos
  // Aumenta el inventario de jugos y disminuye el de ingredientes
  static async increaseStockProduct(productsToIncrease) {
    try {
      for (const product of productsToIncrease) {
        const productName = product.name;
        const ubication = product.ubication;
        const quantityProduced = product.quantity;

        Products.update(
          { quantity: Sequelize.literal(`quantity + ${quantityProduced}`) },
          { where: { name: productName, ubication: ubication } }
        );

        const dataProduct = await Products.findOne({
          where: { name: productName, ubication: ubication },
        });

        await IngredientsController.discountIngredientsStock(
          dataProduct,
          quantityProduced,
          ubication
        );

        return {
          status: 200,
          message: "Todos los productos han sido actualizados correctamente.",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: `Error al actualizar los productos e ingredientes: ${error.message}`,
      };
    }
  }

  // Aumenta el inventario de jugos y sin disminuir el de ingredientes
  // Utilizada cuando se elimina una venta
  static async increaseProducts(data) {
    try {
      const ubication = data.ubication;
      data.products.forEach((e) => {
        Products.update(
          { quantity: Sequelize.literal(`quantity + ${e.quantity}`) },
          { where: { name: e.name, ubication: ubication } }
        );
      });

      return {
        status: 200,
        message:
          "Todos los productos de la venta eliminada han sido actualizados correctamente.",
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Error al actualizar los productos de la venta eliminada",
        error: error.message,
      };
    }
  }

  // Esta se usa cuando se registra una nueva compra
  static async increaseInventoryProduct(data) {
    try {
      const productsList = data.dataBill;
      const ubication = data.ubication;

      productsList.forEach(async (e) => {
        if (e.category === "otros") {
          await Products.update(
            {
              quantity: Sequelize.literal(`quantity + ${e.quantity}`),
            },
            { where: { name: e.name, ubication: ubication } }
          );
        }
      });

      return {
        status: 200,
        message: "El inventario de Productos ha sido modificado.",
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error del servidor al modificar el inventario - Productos ${error.message}.`,
      };
    }
  }
}

module.exports = { ProductsController };
