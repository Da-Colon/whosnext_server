const Model = require('../models/class')

exports.POST_NEW_CLASS = async (req, res) => {
  const {className, classList, createdById} = req.body;
  try{
    const cohort = new Model(className, classList, createdById)
    const newCohort = await cohort.newClass();
    res.status(200).json(newCohort)
  } catch(error){
    return res.status(500).json({message: 'There was a problem adding new class'})
  }
}

exports.GET_ALL_CLASSES = async (req, res) => {
  try{
    const classes = await Model.getClasses();
    res.status(200).json(classes)
  } catch(error){
    return res.status(500).json({message: 'There was a problem retreiving classes'})
  }
}

exports.GET_DEFAULT_CLASS = async (req, res) => {
  try{
    const { prefered_class_list  } = req.body;
    const query = await Model.getDefaultClass(prefered_class_list);
    res.status(200).json(query)

  } catch (error){
    console.log(error)
    return res.status(500).json({message: 'There was a problem retreiving default class'})
  }
}

exports.PUT_EDIT_CLASS_LIST = async (req, res) => {
  const {class_id} = req.params;
  const {className, classList, editedBy } = req.body
  try {
  const editedClass = await Model.editClassList( parseInt(class_id), className, classList, editedBy )
  res.status(200).json(editedClass)
  } catch {
    return res.status(500).json({message: 'There was a problem submitting edited class'})
  }
}
  // delete class route