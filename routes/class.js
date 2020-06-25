const express = require("express");
const router = express.Router();
const class_controllers = require('../controllers/class')

router.post('/class/new' , class_controllers.POST_NEW_CLASS)

router.post('/class/list/all', class_controllers.GET_ALL_CLASSES)

router.post('/class/getdefaultclass', class_controllers.GET_DEFAULT_CLASS)

router.put('/class/edit/:class_id', class_controllers.PUT_EDIT_CLASS_LIST)

module.exports = router;