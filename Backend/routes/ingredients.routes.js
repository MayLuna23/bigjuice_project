const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const {
  IngredientsController,
} = require("../controllers/ingredients.controller");
const { validateData } = require("../middlewares/validator.handler");
const { createIngredientSchema } = require("../db/schemas/ingredients.schema");



router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  async (req, res, next) => {
    try {
      const ingredients = await IngredientsController.getIngredients();
      res.json(ingredients);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const ingredientEdit = await IngredientsController.editOneIngredient(
        id,
        changes
      );
      res.status(ingredientEdit.status).json({
        status: ingredientEdit.status,
        message: ingredientEdit.message,
        error: ingredientEdit.error,
        data: ingredientEdit.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validateData(createIngredientSchema),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newIngredient = await IngredientsController.createIngredient(data);
      res.status(newIngredient.status).json({
        status: newIngredient.status,
        message: newIngredient.message,
        error: newIngredient.error,
        data: newIngredient.data,
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
      const ingredientDeleted = await IngredientsController.deleteIngredient(
        id
      );
      res.status(ingredientDeleted.status).json({
        status: ingredientDeleted.status,
        message: ingredientDeleted.message,
        error: ingredientDeleted.error,
        data: ingredientDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
