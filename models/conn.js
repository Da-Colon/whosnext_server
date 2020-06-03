const pgp = require("pg-promise")({
  query: e => {
    console.log("QUERY:", e.query);
  }
});

const options = {
  host: process.env.HOST,
  database: process.env.DATABASE,
};

const db = pgp(options);

module.exports = db;