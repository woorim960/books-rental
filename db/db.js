const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'books-rental.cesobqa48tpp.ap-northeast-2.rds.amazonaws.com',
  user: 'woorimprog',
  password: 'zx1zx1zx1!',
  database: 'books_rental'
});

db.connect();

module.exports = db;