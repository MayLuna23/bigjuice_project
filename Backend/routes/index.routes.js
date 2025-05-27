const express = require("express");
const usersRoutes = require("./users.routes");
const productsRoutes = require("./products.routes");
const ingredientsRoutes = require("./ingredients.routes");
const categoriesRoutes = require("./categories.routes");
const salesRoutes = require("./sales.routes");
const billsRoutes = require("./bills.routes");
const suppliersRoutes = require("./suppliers.routes");
const loginRoutes = require("./login.routes");
const emailRoutes = require("./email.routes");
const productionRoutes = require("./production.routes");
const router = express.Router();

const allRoutes = (app) => {
  app.use("/api/bigjuice", router);
  router.use("/users", usersRoutes);
  router.use("/products", productsRoutes);
  router.use("/ingredients", ingredientsRoutes);
  router.use("/categories", categoriesRoutes);
  router.use("/sales", salesRoutes);
  router.use("/bills", billsRoutes);
  router.use("/suppliers", suppliersRoutes);
  router.use("/login", loginRoutes);
  router.use("/email", emailRoutes);
  router.use("/production", productionRoutes);
};

module.exports = { allRoutes };
