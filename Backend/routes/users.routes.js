const express = require("express");
const passport = require("passport");
const router = express.Router();
const { checkRoles, checkUbication } = require("../middlewares/auth.handler");
const { validateData } = require("../middlewares/validator.handler");
const { createUserSchema, editUserSchema } = require("../db/schemas/users.schema");
const { UserController } = require("../controllers/users.controller");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const users = await UserController.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/data",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const userData = req.user;
      res.status(200).json({
        rol: userData.rol,
        ubication: userData.ubication,
      })
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validateData(createUserSchema),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await UserController.createUser(data);
      res.status(newUser.status).json({
        status: newUser.status,
        message: newUser.message,
        error: newUser.error,
        data: newUser.data,
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
  validateData(editUserSchema),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const userEdit = await UserController.editOneUser(id, changes);
      res.status(userEdit.status).json({
        status: userEdit.status,
        message: userEdit.message,
        error: userEdit.error,
        data: userEdit.data,
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
      const userDeleted = await UserController.deleteUser(id);
      res.status(userDeleted.status).json({
        status: userDeleted.status,
        message: userDeleted.message,
        error: userDeleted.error,
        data: userDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
