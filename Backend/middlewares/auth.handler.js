const boom = require("@hapi/boom");

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.rol)) {
      next();
    } else {
      next(boom.unauthorized("Acceso no autorizado"));
    }
  };
}

function checkUbication() {
  return (req, res, next) => {
    const user = req.user;
    if (user.ubication === "all") {
      next();
    } else {
      next(boom.unauthorized("Acceso no autorizado"));
    }
  };
}

module.exports = { checkRoles, checkUbication };