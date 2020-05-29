// routes/user.js
'user strict';

const express = require('express'),
  router = express.Router(),
  db = require('../db/db');

// 로그인
router.post('/sign-in', (req, res) => {
  const user = req.body;
  db.query(`SELECT * FROM users WHERE id LIKE ?`, [user.id],
    (err, result) => {
      if (err) 
        throw err;
      if (result != false && result[0].id == user.id && result[0].pw == user.pw)
        res.json(result);
      else 
        res.json(false);
    });
});

// 로그인
router.post('/read', (req, res) => {
  const user = req.body;
  db.query(`SELECT * FROM users WHERE id LIKE ?`, [user.id],
    (err, result) => {
      if (err) 
        throw err;
      if (result != false && result[0].id == user.id && result[0].pw == user.pw)
        res.json(true);
      else 
        res.json(false);
    });
});

// 회원가입
router.post('/sign-up', (req, res) => {
  const user = req.body;
  db.query(`INSERT INTO 
      users(id, name, email, pw, is_manager) 
      VALUES('${user.id}', '${user.name}', '${user.email}', '${user.pw}', 'N')`,
    (err, result) => {
      if (err) 
        return res.json(false);
      res.json(true);
    });
});

/*
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
*/
module.exports = router;