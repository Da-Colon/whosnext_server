const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const bcrypt = require("bcryptjs");
const Model = require("../models/users");

passport.use("local-signup", new localStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
},
  async (req, email, password, done) => {
    console.log(req.body)
    try{
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt)

      const { firstName, lastName } = req.body;
      const user = new UserModel(email, hash, firstName, lastName);
      const res = await user.signup();
      return done(null, res)
    } catch (error){
      done(error)
    }
  }
))

passport.use("login", new localStrategy({
  usernameField: "email",
  passwordField: "password"
},
  async (email, password, done) => {
    try{
      const user = new Model(email, password, '', '');
      const res = await user.login();
      if(!user) {
        return done(null, false, {message: 'Email is not registered'})
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

