const db = require("./conn");
const bcrypt = require("bcryptjs");

class User {
  constructor(
    email,
    password,
    first_name,
    last_name
  )
    {
      this.email = email;
      this.password = password;
      this.firstName = first_name;
      this.lastName = last_name;
    }

    async checkPassword(hashedPassword) {
      return await bcrypt.compareSync(this.password, hashedPassword);
    }

    async login() {
      try{
        return await db.one(`SELECT * FROM users WHERE email = $1`, [this.email]);
      } catch(error) {
        console.log(error);
      }
    }

    async signup() {
      try{
        return await db.result(`INSERT INTO users (email, password, first_name, last_name) VALUES (1$, 2$, 3$, 4$)`, [this.email. this.password, this.firstName, this.lastName])
      } catch(error){
        console.log(error);
      }
    }
}

module.exports = User;