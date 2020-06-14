const db = require("./conn");

class Class {
  constructor(className, classList, userId) {
    this.className = className;
    this.classList = classList;
    this.userId = userId;
  }

  async getUserClasses() {
    try {
      return await db.any("SELECT * from class_list WHERE users_id = $1;", [
        this.userId,
      ]);
    } catch {
      return "Error Finding Classes";
    }
  }

  async newClass() {
    try {
      const query = await db.result(
        "INSERT INTO class_list (name, class_list, users_id) VALUES ($1, $2, $3);",
        [this.className, this.classList, this.userId]
      );
      return query;
    } catch {
      return "Error Class already exists";
    }
  }
}

module.exports = Class;
