const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.NODE_PORT;
const cors = require("cors");
const {allRoutes} = require("./routes/index.routes");
const {
  logErrors,
  errorHandler,
  ormErrorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

app.use(express.json());

//! Cambiar origen
app.use(
  cors({
    origin: ["http://localhost:8000", "https://big-juice-ui.onrender.com", "https://bigjuice.net"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

allRoutes(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);
require("./utils/auth")

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World"
  });
});

app.listen(port, () => {
  console.log(`System running on port ${port}`);
});
