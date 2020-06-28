const db = require("./conn");
const bcrypt = require("bcryptjs");

class User {
  constructor(
    user_name,
    password,
    first_name,
    last_name,
    isInstructor,
    instructorId
  )
    {
      this.userName = user_name;
      this.password = password;
      this.firstName = first_name;
      this.lastName = last_name;
      this.isInstructor = isInstructor;
      this.instructorId = instructorId;
    }

    async checkPassword(hashedPassword) {
      return await bcrypt.compareSync(this.password, hashedPassword);
    }

    async login() {
      try{
        return await db.one(`SELECT * FROM users WHERE user_name = $1;`, [this.userName]);
      } catch(error) {
        console.log(error);
      }
    }

    async signup() {
      try{
        const query =  await db.result(`INSERT INTO users (user_name, password, first_name, last_name, is_instructor) VALUES ($1, $2, $3, $4, $5) RETURNING id;`, [this.userName, this.password, this.firstName, this.lastName, this.isInstructor])
        return query.rows[0].id
      } catch(error){
        console.log(error)
      }
    }

    static allInstructors  = async () => {
      try{
        return await db.any(`SELECT id, first_name, last_name FROM users WHERE is_instructor = true`)
      } catch(error){
        return error
      }
    }

    static async newDefaultClass(id, userId) {
      try{
        const query = await db.one("UPDATE users SET pref_class_list = $1 WHERE id = $2 RETURNING *;", [id, userId])
        return query;
      } catch (error){
        console.log(error)
        return error
      }
    }
}

module.exports = User;