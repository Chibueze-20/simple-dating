const express = require("express");
const {
  LoginUser,
  getCookingWives,
  getCleaningWives,
  getHouseWives,
  getAllWives,
  getAllUsers,
  marry,
  getAllHusbands,
  getCleaningHusbands,
  getWorkingHusbands,
  getCookingHusbands,
  getUser,
} = require("./controller");
const Verify = require('./token_middleware')
const Allow = require('./role_access_middleware')
const { Roles } = require('./constants')


const route = express.Router();

route.route("/login").post(LoginUser);

route.route("/marry").post([Verify, Allow(Roles.User, Roles.Bachelor), marry])

route.route("/all").get([Verify, Allow(Roles.Admin), getAllUsers]);

route.route("/husband/all").get([Verify, Allow(Roles.User), getAllHusbands])

route.route("/husband/cleaning").get([Verify, Allow(Roles.User), getCleaningHusbands])

route.route("/husband/working").get([Verify, Allow(Roles.User), getWorkingHusbands])

route.route("/husband/cooking").get([Verify, Allow(Roles.User), getCookingHusbands])

route.route("/wife/cooking").get([Verify, Allow(Roles.Bachelor), getCookingWives]);

route.route("/wife/cleaning").get([Verify, Allow(Roles.Bachelor), getCleaningWives]);

route.route("/wife/housewives").get([Verify, Allow(Roles.Bachelor), getHouseWives]);

route.route("/wife/all").get([Verify, Allow(Roles.Admin, Roles.Bachelor), getAllWives]);

route.route("/:id").get([Verify, getUser]);

module.exports = route;
