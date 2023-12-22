const express = require("express");
const connectToDatabase = require("./src/config/db.config");
const userRouter = require("./src/routes/userRouter");
const createError = require("http-errors");
const { errorResponse } = require("./src/handler/responseHandler");
const productRouter = require("./src/routes/productRouter");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// listening port
app.listen(port, async () => {
  console.log(`server is running on http://localhost:${port}`);
  await connectToDatabase();
});

// middlewares
app.use(express.json());

// routers
app.use("/api", userRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("server is running");
});

// error handling middlewares
app.use(function (req, res, next) {
  return next(createError(404, "Route no found !"));
});

app.use((err, req, res, next) => {
  return errorResponse(res, { status: err.status, message: err.message });
});
