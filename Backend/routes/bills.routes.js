const express = require("express");
const { checkRoles } = require("../middlewares/auth.handler");
const passport = require("passport");
const router = express.Router();
const { BillsController } = require("../controllers/bills.controller");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const { initialDate, finalDate, ubication } = req.body;
      const bills = await BillsController.getBills(initialDate, finalDate, ubication);
      res.json(bills);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/new",
  // checkRoles("admin"),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const data = req.body;
      const { user } = req.user;
      const newBill = await BillsController.createBill(data, user);
      res.status(newBill.status).json({
        status: newBill.status,
        message: newBill.message,
        error: newBill.error,
        data: newBill.data,
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
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const { initialDate, finalDate, ubication } = req.body;
      const bills = await BillsController.totalBills(
        initialDate,
        finalDate,
        ubication
      );
      res.status(bills.status).json({
        status: bills.status,
        message: bills.message,
        error: bills.error,
        data: bills.data,
      });
    } catch (error) {
      console.error(error)
      next(error);
    }
  }
);

router.put(
  "/edit/:id",
  checkRoles("admin"),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const billEdit = await BillsController.editOneBill(id, changes);
      res.status(billEdit.status).json({
        status: billEdit.status,
        message: billEdit.message,
        error: billEdit.error,
        data: billEdit.data,
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
      const billDeleted = await BillsController.deleteBill(id);
      res.status(billDeleted.status).json({
        status: billDeleted.status,
        message: billDeleted.message,
        error: billDeleted.error,
        data: billDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/restore-bill",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const billDeleted = await BillsController.deleteBillIngredients(data);
      res.status(billDeleted.status).json({
        status: billDeleted.status,
        message: billDeleted.message,
        error: billDeleted.error,
        data: billDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
