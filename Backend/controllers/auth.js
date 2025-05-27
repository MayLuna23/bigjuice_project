const bcrypt = require("bcrypt");
const { Users } = require("../db/models/users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
// const nodemailer = require('nodemailer');

async function getUser(id, password) {
  try {
    const user = await Users.findOne({ where: { id: id } });
    if (!user) {
      return { status: 401, message: "Id o password incorrecto" };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 401, message: "Id o password incorrecto" };
    }
    delete user.dataValues.password;
    return { status: 200, message: "Inicio de sesión exitoso", data: user };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Error del servicio al intentar iniciar sesión",
    };
  }
}

function signToken(user) {
  const payload = {
    rol: user.rol,
    ubication: user.ubication,
    user: user.name,
    user_id: user.id
  };
  const token = jwt.sign(payload, SECRET);
  return {
    token,
  };
}

module.exports = { getUser, signToken };
