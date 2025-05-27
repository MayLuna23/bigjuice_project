const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const { validateData } = require("../middlewares/validator.handler");
const {
  createSupplierSchema,
  editSupplierSchema,
} = require("../db/schemas/suppliers.schema");

const { SuppliersController } = require("../controllers/suppliers.controller");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const suppliers = await SuppliersController.getSuppliers();
      res.json(suppliers);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validateData(createSupplierSchema),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newSupplier = await SuppliersController.createSupplier(data);
      res.status(newSupplier.status).json({
        status: newSupplier.status,
        message: newSupplier.message,
        error: newSupplier.error,
        data: newSupplier.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validateData(editSupplierSchema),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const supplierEdit = await SuppliersController.editOneSupplier(
        id,
        changes
      );
      res.status(supplierEdit.status).json({
        status: supplierEdit.status,
        message: supplierEdit.message,
        error: supplierEdit.error,
        data: supplierEdit.data,
      });
    } catch (error) {
      console.error(error);
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
      const supplierDeleted = await SuppliersController.deleteSupplier(id);
      res.status(supplierDeleted.status).json({
        status: supplierDeleted.status,
        message: supplierDeleted.message,
        error: supplierDeleted.error,
        data: supplierDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
