const db = require("./conn");
const bcrypt = require("bcryptjs");

class User {
  constructor(
    user_name,
    password,
    first_name,
    last_name,
    isInstructor
  )
    {
      this.userName = user_name;
      this.password = password;
      this.firstName = first_name;
      this.lastName = last_name;
      this.isInstructor = isInstructor;
    }

    async checkPassword(hashedPassword) {
      return await bcrypt.compareSync(this.password, hashedPassword);
    }

    async login() {
      try{
        return await db.one(`SELECT * FROM users WHERE user_name = $1`, [this.userName]);
      } catch(error) {
        console.log(error);
      }
    }

    async signup() {
      try{
        return await db.result(`INSERT INTO users (user_name, password, first_name, last_name) VALUES (1$, 2$, 3$, 4$)`, [this.userName. this.password, this.firstName, this.lastName, this.isInstructor])
      } catch(error){
        console.log(error);
      }
    }
}

module.exports = User;