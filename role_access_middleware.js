const HTTPStatus = require("http-status");

function VerifyRoles(...roles) {
  const CheckRole = (req, res, next) => {
    if (!req.user) {
      res
        .status(HTTPStatus.UNAUTHORIZED)
        .json({ message: "User not Logged in" });
      return;
    }
    if (!roles.includes(req.userrole)) {
      res.status(HTTPStatus.FORBIDDEN).json({ message: "User not Allowed" });
      return;
    }
    next();
  };
  return CheckRole;
}
module.exports = VerifyRoles;
