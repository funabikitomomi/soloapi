# 郵便番号取得 API（東京都限定。。）

## 郵便番号から住所を取得したい

- param に郵便番号を入れて GET で取得

```bash
    GET  http://localhost:3000/api/yubinno/XXXXXXX
```

```bash
 例　GET http://localhost:3000/api/yubinno/1000000
```

## 新しい郵便番号を登録したい

- body に登録したい値を入れて POST で登録

```bash
    POST  http://localhost:3000/api/yubinno

    BODY　{
    "yubinno": "1234567",
    "jyusyo": "東京都千代田区その他の住所"
    }
```

## 登録された郵便番号の情報を更新したい

- param に更新したい郵便番号をいれる
- body に変更後の値を入れて PATCH で更新

```bash
    PATCH  http://localhost:3000/api/yubinno/XXXXXXX

    BODY　{
    "yubinno": "7654321",
    "jyusyo": "東京都千代田区変更後住所"
    }
```

## 登録された郵便番号の情報を削除したい

```bash
    DELETE  http://localhost:3000/api/yubinno/XXXXXXX
```
