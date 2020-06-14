const Model = require('../models/class')

exports.POST_NEW_CLASS = async (req, res, next) => {
  const {className, classList, userId} = req.body;
  try{
    const cohort = new Model(className, classList, userId)
    cohort.newClass();
    return res.status(200).json({message: 'Class Saved Successfully'})
  } catch(error){
    return error
  }
}


  // edit class route
  // delete class route