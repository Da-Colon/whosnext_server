const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken')

router.post("/users/login", function (req, res, next) {
  passport.authenticate("login", async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error("Login Error");
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { id: user.id, displayName: user.display_name };
        const token = jwt.sign({ user: body }, process.env.SECRET_TOKEN);
        return res.status(200).json({'user': body, 'token': token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post(
  "/signup",
  passport.authenticate("local-signup", { session: false }),
  (req, res, next) => {
    try{
      res.status(200).json({ message: "Sign up successful" });
    } catch (error){
      return next(error)
    }
  }
);
module.exports = router;
