// routes/book.js
'use strict';

// 모듈 불러오기
const express = require('express'),
  router = express.Router(),
  db = require('../db/db');

// 라우팅
router.get('/', (req, res) => {
  res.render('book/book-main');
});

router.get('/read', (req, res) => {
  db.query(`SELECT * FROM books`, (err, books) => {
    if (err) throw err;
    res.json(books);
  });
});

router.get('/create', (req, res) => {
  res.render('book/create');
});

router.post('/create', (req, res) => {
  const bookData = req.body;
  db.query(`INSERT INTO 
    books(title, discription, author, price, is_rent) 
    VALUES('${bookData.title}', '${bookData.discription}', '${bookData.author}', '${bookData.price}', 'N')`, 
    (err, result) => {
    if (err) throw err;
    res.json(true);
  });
})

router.get('/:seq', (req, res) => {
  const seq = req.params.seq;
  db.query(`SELECT * FROM books WHERE seq = ?`, [seq], (err, book) => {
    res.render('book/detail', book[0]);
  });
});

router.get('/:seq/update', (req, res) => {
  const seq = req.params.seq;
  db.query(`SELECT * FROM books WHERE seq = ?`, [seq], (err, book) => {
    res.render('book/update', book[0]);
  });
});

router.post('/:seq/update', (req, res) => {
  const bookData = req.body;
  db.query(`UPDATE books 
    SET title=?, discription=?, author=?, price=? WHERE seq=?`, 
    [bookData.title, bookData.discription, bookData.author, bookData.price, bookData.seq], 
    (err, book) => {
    if (err) throw err;
    res.json(true);
  });
});

router.post('/:seq/delete', (req, res) => {
  const bookData = req.body;
  db.query(`DELETE FROM books WHERE seq=?`, [bookData.seq], (err, book) => {
    if (err) throw err;
    res.json(true);
  });
});

// 모듈 내보내기
module.exports = router;