const HTTPStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { Cipher } = require("./constants");
const { GetById } = require("./repository");

const VerifyToken = async (request, response, next) => {
  const authHeader = request.headers["authorization"];
  if (!authHeader) {
    response
      .status(HTTPStatus.UNAUTHORIZED)
      .json({ message: "Unauthorised request" });
    return;
  }
  const [prefix, token] = authHeader.split(" ");
  if (prefix !== "Bearer") {
    response
      .status(HTTPStatus.FORBIDDEN)
      .json({ message: "Unauthorised Access" });
    return;
  }
  try {
    const { id, role } = jwt.verify(token, Cipher);
    const user = await GetById(id);
    if (!user) {
      response.status(HTTPStatus.NOT_FOUND).json({ message: "User not found" });
      return;
    }
    request.userid = id;
    request.user = user;
    request.userrole = role;
    next();
  } catch (error) {
    response
      .status(HTTPStatus.UNAUTHORIZED)
      .json({ message: "Invalid Access" });
    return;
  }
  //token- 1234abc
  //authorization: [bearer, 1234abc]
};
module.exports = VerifyToken;
