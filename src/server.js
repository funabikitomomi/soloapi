const express = require("express");
const app = express();

const config = require("../src/config");
const knex = require("knex")(config.db);
const models = require("./models")(knex);

const setupServer = () => {
  app.use(express.json());

  app.get("/api/yubinno", (req, res) => {
    res.send(201).end();
  });

  //郵便番号をparamにいれてレコードを取得する
  app.get("/api/yubinno/:yubinno", (req, res) => {
    //http://localhost:3000/api/yubinno/1000000
    const { yubinno } = req.params;
    models.yubinno
      .getJyusyo({ yubinno })
      .then((jyusyo) => res.json(jyusyo))
      .catch((err) => {
        if (err.message.match("Error finding yubinno")) {
          return res.status(200).json({});
        }
        // throw unknown errors
        return res.status(400).send(err.message);
      });
  });

  //郵便番号と住所をbodyにいれて新しいレコードを作成する
  app.post("/api/yubinno", (req, res) => {
    if (req.body.yubinno && req.body.jyusyo) {
      models.yubinno
        .createYubinnos(req.body)
        .then((yub) => res.json(yub))
        .catch((err) => res.status(400).send(err.message));
    } else {
      res.status(400).send("郵便番号と登録住所が必須です。");
    }
  }); //郵便番号をparamにいれて該当レコードを更新する //更新する値はbodyにいれる
  app.patch("/api/yubinno/:yubinno", (req, res) => {
    const { yubinno } = req.params;
    models.yubinno
      .updateJyusyo(Object.assign(req.body, { yubinno: yubinno }))
      .then((yub) => res.status(204).json(yub))
      .catch((err) => res.status(400).send(err.message));
  });

  app.delete("/api/yubinno/:yubinno", (req, res) => {
    const { yubinno } = req.params;
    models.yubinno
      .deleterecord({ yubinno })
      .then((yub) => res.status(204).json(yub))
      .catch((err) => res.status(400).send(err.message));
  });
  return app;
};

module.exports = { setupServer };
