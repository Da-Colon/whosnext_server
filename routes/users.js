const express = require("express");
const router = express.Router();
const users_controllers = require('../controllers/users')

router.post("/users/login", users_controllers.LOGIN_USER_POST);

router.post("/users/register", users_controllers.REGISTER_USER_POST);

router.get("/users/instructors", users_controllers.INSTRUCTORS_GET);

router.put('/users/default/:class_id', users_controllers.PUT_UPDATE_DEFAULT_CLASS);

module.exports = router;
