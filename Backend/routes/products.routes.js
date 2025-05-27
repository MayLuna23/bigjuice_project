const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const { validateData } = require("../middlewares/validator.handler");
const { createProductSchema } = require("../db/schemas/products.schema");
const { ProductsController } = require("../controllers/products.controller");

const multer = require("multer");
const path = require("path");

// Define la carpeta de destino para almacenar las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/images")); // Ruta relativa a la base del proyecto
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const products = await ProductsController.getProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "../uploads/images", imageName);

  // Envía el archivo de imagen al cliente
  res.sendFile(imagePath, { root: "/" }, (err) => {
    if (err) {
      console.error("Error al enviar el archivo:", err);
      res.status(404).send("La imagen solicitada no se encontró.");
    } else {
    }
  });
});

router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  upload.single("image"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const image = req.file || null;
      const productEdit = await ProductsController.editOneProduct(
        id,
        changes,
        image
      );
      res.status(productEdit.status).json({
        status: productEdit.status,
        message: productEdit.message,
        error: productEdit.error,
        data: productEdit.data,
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
  // validateData(createProductSchema),
  upload.single("image"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const imagen = req.file;
      const newProduct = await ProductsController.createProduct(data, imagen);
      res.status(newProduct.status).json({
        status: newProduct.status,
        message: newProduct.message,
        error: newProduct.error,
        data: newProduct.data,
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
      const productDeleted = await ProductsController.deleteProduct(id);
      res.status(productDeleted.status).json({
        status: productDeleted.status,
        message: productDeleted.message,
        error: productDeleted.error,
        data: productDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post("/discount-stock", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await ProductsController.discountStock(data);
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
});

router.post(
  "/produce",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const data = req.body.listProducts;
      const response = await ProductsController.increaseStockProduct(data);
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
  "/restore-product",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const data = req.body;
      const response = await ProductsController.increaseProducts(data);
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

module.exports = router;
