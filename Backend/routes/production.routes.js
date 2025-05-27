const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const { validateData } = require("../middlewares/validator.handler");
const { createProductSchema } = require("../db/schemas/products.schema");
const {
  ProductionController,
} = require("../controllers/production.controller");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const { initialDate, finalDate, ubication } = req.body;
      const products = await ProductionController.getProduction(
        initialDate,
        finalDate,
        ubication
      );
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  // validateData(createProductSchema),
  async (req, res, next) => {
    try {
      const user = req.user;
      const data = req.body;
      const newProduction = await ProductionController.createProduction(data, user);
      res.status(newProduction.status).json({
        status: newProduction.status,
        message: newProduction.message,
        error: newProduction.error,
        data: newProduction.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log(req.body);
      const data = req.body;
      const resp = await ProductionController.deleteProduction(id, data);
      res.status(resp.status).json({
        status: resp.status,
        message: resp.message,
        error: resp.error,
        data: resp.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);


module.exports = router;
