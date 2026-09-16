const { createHandler } = require("../routeHandler");

const handleGuest = createHandler("auth");

module.exports = (req, res) => {
  req.url = "/guest";
  return handleGuest(req, res);
};