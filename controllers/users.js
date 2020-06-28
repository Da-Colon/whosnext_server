const passport = require("passport");
const jwt = require("jsonwebtoken");
const Model = require("../models/users");

exports.LOGIN_USER_POST = (req, res, next) => {
  passport.authenticate("login", async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error("Login Error");
        return console.log(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = {
          id: user.id,
          user_name: user.user_name,
          first_name: user.first_name,
          last_name: user.last_name,
          is_instructor: user.is_instructor,
          prefered_class_list: user.pref_class_list
        };
        const token = jwt.sign({ user: body }, process.env.SECRET_TOKEN);
        return res.status(200).json({ user: body });
      });
    } catch (error) {
      return res.status(500).json({ message: "There was a server error" });
    }
  })(req, res, next);
};

exports.REGISTER_USER_POST = (req, res, next) => {
  passport.authenticate("signup", async (error, user, userId) => {
    if (error) {
      return res.status(500).json({ message: "There was a server error" });
    }
    const body = {
      id: userId,
      first_name: user.firstName,
      last_name: user.lastName,
      isInstructor: user.isInstructor,
    };
    res.status(200).json({ user: body });
  })(req, res, next);
};

exports.INSTRUCTORS_GET = async (req, res, next) => {
  try {
    const response = await Model.allInstructors();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.PUT_UPDATE_DEFAULT_CLASS = async (req, res) => {
  const {class_id} = req.params;
  const {userId} = req.body;
  try {
    const userUpdated = await Model.newDefaultClass(class_id, userId)
    res.status(200).json(userUpdated)
  } catch(error) {
    console.log(error)
    return res.status(500)
  }
}
