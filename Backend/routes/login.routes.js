const express = require("express");
const router = express.Router();
// const { loginSchema } = require("../schemas/auth.schema")
const { validateData } = require("../middlewares/validator.handler");
const passport = require("passport");
const { signToken } = require("../controllers/auth");

// const jwt = require('jsonwebtoken');
// const SECRET = process.env.JWT_SECRET;

router.post(
  "/",
  // validateData(loginSchema),
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const response = req.user;
      if (response.status === 401) {
        res.status(response.status).json({
          status: response.status,
          message: response.message,
          error: response.error,
          data: response.data,
        });
      } else {
        const tokenData = signToken(response.data.dataValues); // Genera el token
        res.status(response.status).json({
          status: response.status,
          message: response.message,
          error: response.error,
          data: {
            response: response.data,
            token: tokenData.token // Agrega el token generado
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
