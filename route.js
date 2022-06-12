const express = require("express");
const {
  LoginUser,
  getCookingWives,
  getCleaningWives,
  getHouseWives,
  getAllWives,
  getAllUsers,
  getUser,
} = require("./controller");
const Verify = require("./token_middleware");
const Allow = require("./role_access_middleware");
const { Roles } = require("./constants");

const route = express.Router();

route.route("/login").post(LoginUser);

route.route("/all").get([Verify, Allow(Roles.Admin), getAllUsers]);

route
  .route("/wife/cooking")
  .get([Verify, Allow(Roles.Bachelor), getCookingWives]);

route
  .route("/wife/cleaning")
  .get([Verify, Allow(Roles.Bachelor), getCleaningWives]);

route
  .route("/wife/housewives")
  .get([Verify, Allow(Roles.Bachelor), getHouseWives]);

route
  .route("/wife/all")
  .get([Verify, Allow(Roles.Admin, Roles.Bachelor), getAllWives]);

route.route("/:id").get([Verify, getUser]);

//get husbands (all)
// get cleaning,cooking,working husbands
// get all users with partners
// get all couples i.e get an array where each object is {husband:{},wife:{}}
// marry (userid) [wife can only marry husband and vise versa]


module.exports = route;
