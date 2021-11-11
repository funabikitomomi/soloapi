const moment = require("moment");

const Yubinno = function(dbUser) {
  this.id = dbUser.id;
  this.yubinno = dbUser.yubinno;
  this.jyusyo = dbUser.jyusyo;
};

Yubinno.prototype.serialize = function() {
  // serialize を使用してオブジェクトをフォーマットし、
  // パスワードなどクライアントに送信すべきでない情報（パスワードなど）を削除します。
  return {
    id: this.id,
    yubinno: this.yubinno,
    jyusyo: this.jyusyo,
  };
};

//郵便番号をいれてレコードを取得する
const getJyusyo = (knex) => {
  return (params) => {
    const { yubinno } = params;
    return knex("yubinno")
      .where({ yubinno: yubinno })
      .select()
      .then((yubinnos) => {
        if (yubinnos.length) return new Yubinno(yubinnos.pop());

        throw new Error(`Error finding yubinno${yubinno}`);
      });
  };
};

//郵便番号と住所をいれて新しいレコードを作成する
const createYubinnos = (knex) => {
  return (params) => {
    const { yubinno, jyusyo } = params;
    return knex("yubinno")
      .insert({
        yubinno: yubinno,
        jyusyo: jyusyo,
      })
      .then(() => {
        return knex("yubinno")
          .where({ yubinno: yubinno })
          .select();
      })
      .then((yub) => new Yubinno(yub.pop()))
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          // throw unknown errors
          return Promise.reject(err);
      });
  };
};

//指定した郵便番号のデータを更新する
const updateJyusyo = (knex) => {
  return (params) => {
    const { yubinno, jyusyo } = params;
    return knex("yubinno")
      .where({ yubinno: yubinno })
      .update({
        yubinno: yubinno,
        jyusyo: jyusyo,
      })
      .then(() => {
        return knex("yubinno")
          .where({ yubinno: yubinno })
          .select();
      })
      .then((yub) => new Yubinno(yub.pop()))
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          // throw unknown errors
          return Promise.reject(err);
      });
  };
};

//指定した郵便番号のデータを削除する
const deleterecord = (knex) => {
  return (params) => {
    const { yubinno } = params;
    return knex("yubinno")
      .where({ yubinno: yubinno })
      .del()
      .catch((err) => {
        // throw unknown errors
        return Promise.reject(err);
      });
  };
};

module.exports = (knex) => {
  return {
    getJyusyo: getJyusyo(knex),
    createYubinnos: createYubinnos(knex),
    updateJyusyo: updateJyusyo(knex),
    deleterecord: deleterecord(knex),
  };
};
