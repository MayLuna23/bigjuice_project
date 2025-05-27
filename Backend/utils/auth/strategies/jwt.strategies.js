require("dotenv").config();
const SECRET = process.env.JWT_SECRET;
const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload)
});


module.exports = JwtStrategy;