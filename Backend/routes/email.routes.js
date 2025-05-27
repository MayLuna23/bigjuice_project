const express = require("express");
const router = express.Router();
const passport = require("passport");
const { zeroSaleEmail } = require("../controllers/email");

router.post(
  "/zero-sale",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req.user;
      const { customer, ubication } = req.body;
      const emailRequest = await zeroSaleEmail(user, customer, ubication);
      res.status(emailRequest.status).json({
        status: emailRequest.status,
        message: emailRequest.message,
        error: emailRequest.error,
        data: emailRequest.data,
      });
    } catch (error) {
      console.error(error)
      next(error);
    }
  }
);

module.exports = router;
