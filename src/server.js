const express = require("express");
const app = express();

app.get("GET /yubinno/:yubinno", (req, res) => {
  const jyusho = knex("yubinno")
    .where({ yubinno: req.param("yubinno") })
    .select(jyusho);
  res.send(jyusho);
});

return knex("users")
  .insert({ username: username.toLowerCase() })
  .then(() => {
    return knex("users")
      .where({ username: username.toLowerCase() })
      .select();
  });
