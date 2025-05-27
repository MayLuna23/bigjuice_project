const express = require("express");
const passport = require("passport");
const router = express.Router();
const { checkRoles } = require("../middlewares/auth.handler");
const { SalesController } = require("../controllers/sales.controller");
// const { ProductsController } = require("../controllers/products.controller");
const moment = require("moment");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      // const { initialDate, finalDate, ubication } = req.body;
      const sales = await SalesController.getSales();
      res.json(sales);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const userData = req.user;
      const {ubication} = req.body
      let data = req.body;
      data.ubication = ubication;
      data.user = userData.user;
      data.id_user = userData.user_id;

      const response = await SalesController.newSale(data);
      res.status(response.status).json({
        status: response.status,
        message: response.message,
        error: response.error,
        data: response.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/total",
  passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  async (req, res, next) => {
    try {
      const { rol } = req.user;
      const { initialDate, finalDate, ubication } = req.body;

      // Verificar si el rol es diferente de "admin"
      if (rol !== "admin") {
        // Verificar si la diferencia de fechas es más de 3 días
        const currentDate = moment();
        const providedInitialDate = moment(initialDate);
        const daysDifference = currentDate.diff(providedInitialDate, "days");

        if (daysDifference > 3) {
          return res.status(403).json({
            status: 403,
            message: "No tienes permiso para acceder a fechas mayores a 3 días atras.",
          });
        }
      }

      const sales = await SalesController.totalSales(
        initialDate,
        finalDate,
        ubication
      );
      
      res.status(sales.status).json({
        status: sales.status,
        message: sales.message,
        error: sales.error,
        data: sales.data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/category",
  passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  async (req, res, next) => {
    try {
      const { rol } = req.user;
      const { initialDate, finalDate, category, ubication } = req.body;
      
      // Verificar si el rol es diferente de "admin"
      if (rol !== "admin") {
        // Verificar si la diferencia de fechas es más de 3 días
        const currentDate = moment();
        const providedInitialDate = moment(initialDate);
        const daysDifference = currentDate.diff(providedInitialDate, "days");

        if (daysDifference > 3) {
          return res.status(403).json({
            status: 403,
            message: "No tienes permiso para acceder a fechas mayores a 3 días atras.",
          });
        }
      }
      const sales = await SalesController.totalSalesCategory(
        initialDate,
        finalDate,
        category,
        ubication
      );
      res.status(sales.status).json({
        status: sales.status,
        message: sales.message,
        error: sales.error,
        data: sales.data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/remove/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const saleDeleted = await SalesController.deleteSale(id);
      res.status(saleDeleted.status).json({
        status: saleDeleted.status,
        message: saleDeleted.message,
        error: saleDeleted.error,
        data: saleDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/products",
  // passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  async (req, res, next) => {
    try {

      // const { rol } = req.user;
      const { initialDate, finalDate, ubication } = req.body;
      
      // Verificar si el rol es diferente de "admin"
      // if (rol !== "admin") {
      //   // Verificar si la diferencia de fechas es más de 3 días
      //   const currentDate = moment();
      //   const providedInitialDate = moment(initialDate);
      //   const daysDifference = currentDate.diff(providedInitialDate, "days");

      //   if (daysDifference > 3) {
      //     return res.status(403).json({
      //       status: 403,
      //       message: "No tienes permiso para acceder a fechas mayores a 3 días atras.",
      //     });
      //   }
      // }
      const sales = await SalesController.totalSalesEachProduct(
        initialDate,
        finalDate,
        ubication
      );
      res.status(sales.status).json({
        status: sales.status,
        message: sales.message,
        error: sales.error,
        data: sales.data,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
