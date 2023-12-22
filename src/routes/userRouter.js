const { Router } = require("express");
const User = require("../schemas/User/User");
const {
  errorResponse,
  successResponse,
} = require("../handler/responseHandler");
const createError = require("http-errors");
const { createJsonWebToken } = require("../utils/jwt/createjsonwebtoken");
const { emailWithNodemailer } = require("../config/email");
const html = require("../utils/template");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  // validation
  const userExists = await User.exists({ email });
  if (userExists) {
    return errorResponse(res, {
      status: 409,
      message: "email already exists !",
    });
  }
  // create jwt token
  const token = createJsonWebToken(
    { name, email, phone, password },
    process.env.SECRET_KEY,
    "10m"
  );

  // prepare email
  const emailData = {
    email,
    subject: `Account Activation Email `,
    html: html(name, token),
  };
  // send email
  try {
    await emailWithNodemailer(emailData);
  } catch (error) {
    return errorResponse(res, { status: 500, message: "failed" });
  }
  res.send(token);
});

// verify user route
userRouter.post("/verify", async (req, res) => {
  const token = req.body?.token;
  if (!token) {
    return errorResponse(res, { status: 403, message: "Invalid Token" });
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
    if (err) {
      return errorResponse(res, { status: 401, message: "Token Expired" });
    }
    try {
      const hashedPassword = await bcrypt.hash(decode.password, 10);

      // create new user
      const newUser = new User({
        name: decode.name,
        email: decode.email,
        phone: decode.phone,
        password: hashedPassword,
      });
      const result = await newUser.save();
      return successResponse(res, {
        status: 201,
        message: "Registration successful !",
        payload: result,
      });
    } catch (err) {
      return errorResponse(res, { status: 500, message: err?.message });
    }
  });
});

module.exports = userRouter;