const db = require("./conn");

class ClassList {
  constructor(studentList, classId){
    this.studentList = studentList;
    this.classId = classId
  }

  async createNewClassList() {
    try{
      const query = await db.result('INSERT INTO class_list (class_list, class_name_id) VALUES ($1, $2)', [this.classList, this.classId])
      return query;
    } catch(error){
      return error;
    }
  }
}

module.exports = ClassList