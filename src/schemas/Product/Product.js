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
        enum: ["red", "green", "blue", "pink"],
      },
      image: {
        type: String,
        required: true,
      },
      size: [
        {
          sizeName: String,
        },
      ],
    },
  ],
  price: {
    type: Number,
    required: true,
  },
});

const Product = model("Product", productSchema);
module.exports = Product;
