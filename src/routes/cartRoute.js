const { Router } = require("express");
const Cart = require("../schemas/Cart/Cart");
const Product = require("../schemas/Product/Product");
const {
  errorResponse,
  successResponse,
} = require("../handler/responseHandler");

const cartRouter = Router();

cartRouter.post("/addToCart", async (req, res) => {
  const { product, quantity, color, size } = req.body;
  const userId = "6585a66019153478ea4c6c4e";

  try {
    // check product id isValid or not
    const isValidProduct = await Product.findOne({ _id: product });

    if (!isValidProduct?._id) {
      // if not exists
      return errorResponse(res, {
        status: 404,
        message: "Invalid Product Id !",
      });
    }
    // calculate totalPrice
    const totalPrice = parseInt(isValidProduct.price) * parseInt(quantity);
    // logic start
    const alreadyExistsCart = await Cart.findOne({
      user: userId,
      active: true,
    });

    if (alreadyExistsCart?.active) {
      // update quantity
      const existsProduct = alreadyExistsCart.products?.find(
        (item) => item.product == product
      );

      // if this product already have cart
      if (existsProduct?._id) {
        existsProduct.quantity += quantity;
        existsProduct.price += totalPrice;
        existsProduct.color = color;
        existsProduct.size = size;
        await alreadyExistsCart.save();
        return successResponse(res, {
          status: 200,
          message: "Quantity Updated !",
        });
      } else {
        // add new product to cart
        alreadyExistsCart.products.push({
          product: product,
          quantity,
          color,
          size,
          price: totalPrice,
        });
        await alreadyExistsCart.save();
        return successResponse(res, {
          status: 200,
          message: "Product Added To Your Cart !",
        });
      }
    } else {
      // create a new cart

      try {
        const newCart = new Cart({
          user: userId,
          products: [{ product, quantity, color, size, price: totalPrice }],
          active: true,
        });
        const result = await newCart.save();
        return successResponse(res, {
          status: 200,
          message: "Product Added To Your Cart !",
          payload: result,
        });
      } catch (error) {
        return errorResponse(res, {
          status: 500,
          message: "Something went wrong !",
        });
      }
    }
  } catch (err) {
    return errorResponse(res, {
      status: 500,
      message: err?.message,
    });
  }
});
// get user cart product
cartRouter.get("/", async (req, res) => {
  const userId = "6585a66019153478ea4c6c4e";

  try {
    const results = await Cart.findOne({ user: userId, active: true }).populate(
      {
        path: "products.product",
        select: "title",
      }
    );
    //calculate total price
    const subtotal = results.products.reduce(
      (prev, current) => prev + current.price,
      0
    );

    return successResponse(res, {
      status: 200,
      message: "success",
      payload: { results, subtotal },
    });
  } catch (error) {
    return errorResponse(res, {
      status: 500,
      message: "something went wrong!",
    });
  }
});

// quantityUpdate
cartRouter.patch("/updateQuantity", async (req, res) => {
  const { productId, type } = req.body;
  const userId = "6585a66019153478ea4c6c4e";
  try {
    const userCart = await Cart.findOne({
      user: userId,
      active: true,
    }).populate({
      path: "products.product",
      select: ["title", "price"],
    });
    if (userCart?._id) {
      const existingProduct = userCart.products.find(
        (item) => (item._id = productId)
      );

      if (existingProduct?._id) {
        // if type increment
        if (type == "inc") {
          existingProduct.price =
            existingProduct.product.price * (existingProduct.quantity + 1);
          existingProduct.quantity += 1;
          await userCart.save();
          return successResponse(res, {
            status: 201,
            message: "Quantity increased !",
          });
        }
        // if type decrement
        if (type == "dec") {
          if (existingProduct.quantity > 1) {
            existingProduct.price =
              existingProduct.product.price * (existingProduct.quantity - 1);
            existingProduct.quantity -= 1;

            await userCart.save();
            return successResponse(res, {
              status: 201,
              message: "Quantity decreased !",
            });
          } else {
            console.log("delete");
            //if product quantity 1 then this login will remove the product from cart
            const newProductArray = userCart.products.filter(
              (item) => item._id != productId
            );

            userCart.products = newProductArray;
            await userCart.save();
            return successResponse(res, {
              status: 200,
              message: "Product Delete Successfully !",
            });
          }
        }
      }
      return errorResponse(res, {
        status: 404,
        message: "Product not available !",
      });
    }
    return errorResponse(res, {
      status: 204,
      message: "You Have No active Cart !",
    });
  } catch (error) {
    return errorResponse(res, {
      status: 500,
      message: errorResponse(res, { status: 500, message: error.message }),
    });
  }
});

module.exports = cartRouter;
