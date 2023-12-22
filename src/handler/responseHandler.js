const errorResponse = (
  res,
  { status = 500, message = "internal server error !" }
) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

// success responseHandler
const successResponse = (
  res,
  { status = 200, message = "success", payload = {} }
) => {
  return res.status(status).json({
    success: true,
    message,
    payload,
  });
};

module.exports = { errorResponse, successResponse };
