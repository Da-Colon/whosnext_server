const express = require('express')
const router = express.Router();
const Class = require('../models/class')

router.post('/newclass' ,(res, req, next) => {
  const {className, classList, userId} = req.body;
  try{
    const createClass = new Class(className, userId)
    if(createClass){
      for(student in classList){
        const query = new ClassMate
      }
    }
  } catch(error){
    return error
  }

  // edit class route
  // delete class route
})