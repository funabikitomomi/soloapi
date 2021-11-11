module.exports = function(knex) {
  return {
    yubinno: require("./yubinno")(knex),
  };
};
