const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const bcrypt = require("bcryptjs");
const Model = require("../models/users");

passport.use("signup", new localStrategy({
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true
},
  async (req, username, password, done) => {
    try{
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt)
      const { firstName, lastName, isInstructor } = req.body;
      const user = new Model(username, hash, firstName, lastName, isInstructor);
      const res = await user.signup();
      return done(null, user, res)
    } catch (error){
      done(error)
    }
  }
))

passport.use("login", new localStrategy({
  usernameField: "username",
  passwordField: "password"
},
  async (username, password, done) => {
    try{
      const user = new Model(username, password, '', '');
      const res = await user.login();
      if(!user) {
        return done(null, false, {message: 'username is not registered'})
      }
      const isValid = await user.checkPassword(password);
      if(!isValid) {
        return done(null, res, {message: "Log in Successful!"})
      }
    } catch(error){
      return done(error);
    }
  }
))

passport.use(new JWTstrategy({
  secretOrKey: 'secret_token',
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter(process.env.SECRET_TOKEN)
}, async( token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error)
  }
}))

