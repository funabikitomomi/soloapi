const moment = require("moment");

const User = function(dbUser) {
  this.id = dbUser.id;
  this.username = dbUser.username;
  this.createdAt = new Date(dbUser.created_at);
};

User.prototype.serialize = function() {
  // serialize を使用してオブジェクトをフォーマットし、
  // パスワードなどクライアントに送信すべきでない情報（パスワードなど）を削除します。
  return {
    id: this.id,
    username: this.username,
    createdAt: moment(this.createdAt).format("hh:mm:ss"),
  };
};

module.exports = (knex) => {
  return {
    create: require("./create")(knex, User),
    list: require("./list")(knex, User),
    get: require("./get")(knex, User),
  };
};
