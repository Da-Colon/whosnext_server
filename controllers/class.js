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

exports.GET_ALL_CLASSES = async (req, res) => {
  try{
    const classes = await Model.getClasses();
    return res.status(200).json(classes)
  } catch(error){
    return res.status(401);
  }
}

exports.GET_DEFAULT_CLASS = async (req, res) => {
  const { prefered_class_list  } = req.body;
  console.log(req.body)
  const query = await Model.getDefaultClass(prefered_class_list);
  return res.status(200).json(query)
}

exports.PUT_UPDATE_DEFAULT_CLASS = async (req, res) => {
  const {userId, classListId} = req.body;
  try{
    const query = await Model.newDefaultClass(classListId, userId)
    return res.status(200)
  } catch(error) {
    console.log(error)
    return res.status(401)
  }
}

  // edit class route
  // delete class route