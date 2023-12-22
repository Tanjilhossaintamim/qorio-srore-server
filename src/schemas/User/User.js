const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => {
        return /^(?:(?:\+|00)88|01)?\d{11}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
      required: [true, "Phone number is required!"],
    },
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid email!`,
      required: [true, "Email is required!"],
    },
  },
  password: {
    type: String,
    min: [6, "Password must be at least 6 characters"],
  },
});

const User = model("User", userSchema);

module.exports = User;
