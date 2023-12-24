const { model } = require("mongoose");
const { Schema } = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  variation: [
    {
      color: {
        type: String,
        required: true,
        enum: ["red", "green", "blue", "pink", "white", "black", "yellow","orange"],
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  size: [
    {
      sizeName: String,
    },
  ],
});

const Product = model("Product", productSchema);
module.exports = Product;
