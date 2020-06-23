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
      const query = await db.result(
        "INSERT INTO class_list (name, class_list, users_id) VALUES ($1, $2, $3) RETURNING *;",
        [this.className, this.classList, this.userId]
      );
      const {id} = await query;
      this.newDefaultClass(id, this.userId);

      return await query;
    } catch (error){
      console.log("Error Class already exists")
      return error
    }
  }

  static async newDefaultClass(id, userId) {
    try{
      await db.any("UPDATE user SET pref_class_list = $1 WHERE user_id = $2;", [id, userId])
      return;
    } catch (error){
      console.log(error)
      return error
    }
  }

  static async getDefaultClass(id) {
    try{
      const query = await db.one("SELECT * FROM class_list WHERE id = $1;", [id])
      return await query
    } catch(error){
      console.log(error)
      return error
    }
  }
}



module.exports = Class;
