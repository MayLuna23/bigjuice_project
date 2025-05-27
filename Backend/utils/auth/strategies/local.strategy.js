const { Strategy } = require("passport-local");
const { getUser } = require("../../../controllers/auth");

const LocalStrategy = new Strategy(
  {
    usernameField: "id",
    passwordField: "password",
  },
  async (id, password, done) => {
    try {
      const user = await getUser(id, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports =  LocalStrategy ;