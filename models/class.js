const db = require("./conn");

class Class {
  constructor(className, userId){
    this.className = className;
    this.userId = user_id

  }

  async getUserClasses() {
    try{
      const response = await db.any('SELECT * from class_name WHERE user_id = user.id($1)', [this.user_id])
      return response;
    } catch{
      return "Error Finding Classes"
    }
  }

  async newClass() {
    const classNameLists = getUsersClasses();
    if(!classNameLists.includes(this.className)){
      const query = await db.result('INSERT INTO class_name (name, user_id) VALUES ($1, $2)', [this.className, this.user_Id]);
      return query;
    }
    return;
  }
}

module.exports = Class;