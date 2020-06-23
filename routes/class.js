const express = require("express");
const router = express.Router();
const class_controllers = require('../controllers/class')

router.post('/class/newclass' , class_controllers.POST_NEW_CLASS)

router.get('/class/list/all', class_controllers.GET_ALL_CLASSES)

router.post('/class/getdefaultclass', class_controllers.GET_DEFAULT_CLASS)

router.put('/class/setNewDefaultClass', class_controllers.PUT_UPDATE_DEFAULT_CLASS)

module.exports = router;