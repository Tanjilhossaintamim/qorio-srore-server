const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kkcmbk1.mongodb.net/ecommerce?retryWrites=true`
    )
    .then(() => console.log("database connected successfully !"))
    .catch(() => console.log("database connection failed !"));
};

module.exports = connectToDatabase;
