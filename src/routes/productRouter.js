const { Router } = require("express");
const {
  errorResponse,
  successResponse,
} = require("../handler/responseHandler");
const Product = require("../schemas/Product/Product");

const productRouter = Router();

productRouter.post("/", async (req, res) => {
  const data = req.body;

  try {
    const newProduct = new Product(data);
    const result = await newProduct.save();
    return successResponse(res, {
      status: 201,
      message: "Product created successfully !",
      payload: result,
    });
  } catch (error) {
    return errorResponse(res, { status: 500, message: error?.message });
  }
});

// get all products

productRouter.get("/", async (req, res) => {
  try {
    const results = await Product.find();
    return successResponse(res, {
      status: 200,
      message: "Request done successfully",
      payload: results,
    });
  } catch (error) {
    return errorResponse(res, { status: 500, message: error?.message });
  }
});
// get single product
productRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    return successResponse(res, {
      status: 200,
      message: "Product get successfully",
      payload: product,
    });
  } catch (error) {
    return errorResponse(res, { status: 500, message: error?.message });
  }
});

module.exports = productRouter;
