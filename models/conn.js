const pgp = require("pg-promise")({
  query: e => {
    console.log("QUERY:", e.query);
  }
});

pgp.pg.defaults.ssl = {rejectUnauthorized: false}

// const options = {
//   host: process.env.DATABASE_URL["host"],
//   database: process.env.DATABASE_URL["database"],
//   user: process.env.DATABASE_URL["user"],
//   password: process.env.DATABASE_URL["pass"]
// };

const db = pgp(process.env.DATABASE_URL);

module.exports = db;