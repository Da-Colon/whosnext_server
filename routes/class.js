const express = require("express");
const router = express.Router();
const class_controllers = require('../controllers/class')

router.post('/class/newclass' , class_controllers.POST_NEW_CLASS)

module.exports = router;