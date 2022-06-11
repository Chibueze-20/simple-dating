const HTTPStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { Login, Query, CreateUser, GetById } = require("./repository");
const { Roles, Cipher } = require("./constants");

function Success(res, message, data = {}) {
  res.status(HTTPStatus.OK).json({ message, data });
}
function Failure(res, code, message, data = {}) {
  res.status(code).json({ message, data });
}
function Created(res, data = {}) {
  res
    .status(HTTPStatus.CREATED)
    .json({ message: "Successfully Created", data });
}

const LoginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const User = await Login(username, password);
    if (!User) {
      Failure(res, 400, "Invalid Username or Password");
      return;
    }
    // get token here
    const token = jwt.sign({ id: User._id, role: User.role }, Cipher, {
      expiresIn: "8h",
    });
    const data = { user: User, token };
    Success(res, "User Logged in", data);
    return;
  } catch (error) {
    next(error);
  }
};
const createUser = async (req, res, next) => {
  try {
    const userObj = req.body;
    const User = await CreateUser(userObj);
    if (User) {
      return Created(res, User);
    } else {
      return Failure(res, 500, "Error Saving User");
    }
  } catch (error) {
    next(error);
  }
};
const getCookingWives = async (req, res, next) => {
  try {
    const data = await Query({ canCook: true, role: Roles.User });
    data.length > 0
      ? Success(res, "Wives found", data)
      : Failure(res, HTTPStatus.NOT_FOUND, "No Wives Available", data);
    return;
  } catch (error) {
    next(error);
  }
};
const getCleaningWives = async (req, res, next) => {
  try {
    const data = await Query({ canClean: true, role: Roles.User });
    data.length > 0
      ? Success(res, "Wives found", data)
      : Failure(res, HTTPStatus.NOT_FOUND, "No Wives Available", data);
    return;
  } catch (error) {
    next(error);
  }
};
const getHouseWives = async (req, res, next) => {
  try {
    const data = await Query({
      canCook: true,
      canClean: true,
      role: Roles.User,
    });
    return data.length > 0
      ? Success(res, "Wives found", data)
      : Failure(res, HTTPStatus.NOT_FOUND, "No Wives Available", data);
  } catch (error) {
    next(error);
  }
};

const getAllWives = async (req, res, next) => {
  try {
    const data = await Query({
      role: Roles.User,
    });
    return data.length > 0
      ? Success(res, "Wives found", data)
      : Failure(res, HTTPStatus.NOT_FOUND, "No Wives Available", data);
  } catch (error) {
    next(error);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const data = await Query();
    return data.length > 0
      ? Success(res, "Users found", data)
      : Failure(res, HTTPStatus.NOT_FOUND, "No Users Available", data);
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await GetById(id);
    user
      ? Success(res, "User Found", user)
      : Failure(res, HTTPStatus.NOT_FOUND, "User not Found");
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getCookingWives,
  getCleaningWives,
  getHouseWives,
  getAllWives,
  LoginUser,
};
