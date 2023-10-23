const express = require("express");
const { registerController ,loginController} = require("../Controllers/authContoller");
const route = express.Router();

route.post(
  "/register",
  registerController
);
route.post(
  "/login",
  loginController
);

module.exports = route;
