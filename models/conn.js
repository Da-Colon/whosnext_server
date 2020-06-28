const pgp = require("pg-promise")({
  query: e => {
    console.log("QUERY:", e.query);
  }
});

pgp.pg.defaults.ssl = true;

const options = {
  host: 'localhost',
  database: 'postgresql-graceful-06195',
};

const db = pgp(options);

module.exports = db;