const db = require("./conn");

class Class {
  constructor(className, classList, userId) {
    this.className = className;
    this.classList = classList;
    this.userId = userId;
  }

  static async getClasses() {
    try {
      const query = await db.any("SELECT * FROM class_list;");
      return query
    } catch {
      return "Error Finding Classes";
    }
  }

  async newClass() {
    try {
      const query = await db.one(
        "INSERT INTO class_list (name, class_list, users_id) VALUES ($1, $2, $3) RETURNING *;",
        [this.className, this.classList, this.userId]
      );
      return query;
    } catch (error){
      return error
    }
  }

  static async getDefaultClass(id) {
    try{
      const query = await db.one("SELECT * FROM class_list WHERE id = $1;", [id])
      return query
    } catch(error){
      return error;
    }
  }

  static async editClassList(classId, className, classList, editedById) {
    try{
      const query = await db.one("UPDATE class_list SET name = $1, class_list = $2, lastEditedBy = $3 WHERE id = $4 RETURNING *;", [className, classList, editedById, classId])
      return query;
    } catch (error) {
      return error
    }
  }
}



module.exports = Class;
