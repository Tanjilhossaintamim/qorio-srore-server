const jwt = require("jsonwebtoken");

const createJsonWebToken = (payload, secrete, expiredTime = "10m") => {
  if (typeof payload !== "object" || payload == {}) {
    return false;
  }
  try {
    const token = jwt.sign(payload, secrete, { expiresIn: expiredTime });
    return token;
  } catch (error) {
    return error;
  }
};

module.exports = { createJsonWebToken };
