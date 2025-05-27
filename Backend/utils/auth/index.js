const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategies');

passport.use(LocalStrategy);
passport.use(JwtStrategy);
