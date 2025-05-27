const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const {
  CategoriesController,
} = require("../controllers/categories.controller");

router.get("/", async (req, res, next) => {
  try {
    const categories = await CategoriesController.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newCategory = await CategoriesController.createCategory(data);
      res.status(newCategory.status).json({
        status: newCategory.status,
        message: newCategory.message,
        error: newCategory.error,
        data: newCategory.data,
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
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const categoryEdit = await CategoriesController.editOneCategory(
        id,
        changes
      );
      res.status(categoryEdit.status).json({
        status: categoryEdit.status,
        message: categoryEdit.message,
        error: categoryEdit.error,
        data: categoryEdit.data,
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
      const categoryDeleted = await CategoriesController.deleteCategory(id);
      res.status(categoryDeleted.status).json({
        status: categoryDeleted.status,
        message: categoryDeleted.message,
        error: categoryDeleted.error,
        data: categoryDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
