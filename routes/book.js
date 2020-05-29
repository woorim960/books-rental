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
  db.query(`SELECT * FROM books`, (err1, books) => {
    if (err1) throw err;
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

      db.query(`ALTER TABLE books AUTO_INCREMENT = 1`, (err2, result1) => {
        if (err2) throw err;
        db.query(`SET @COUNT = 0`, (err3, result2) => {
          if (err3) throw err;
          db.query(`UPDATE books SET books.seq = @COUNT:=@COUNT+1`, (err4, result3) => {
            if (err4) throw err;
            res.json(true);
          });
        });
      });
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

router.post('/:seq/rental', (req, res) => {
  const user = req.body,
    book = req.params;

  db.query(`SELECT renter_user_id FROM books WHERE renter_user_id=?`, 
    [user.currentUser], (err, result) => {
      if (result == false) {
        db.query(`UPDATE books SET renter_user_id=? WHERE seq=?`, 
        [user.currentUser, book.seq], (err, book) => {
          if (err) throw err;
          res.json(true);
        });
      } else {
        res.json(false);        
      }
  });
});

router.post('/:seq/return', (req, res) => {
  const user = req.body,
    book = req.params;

  db.query(`SELECT renter_user_id FROM books WHERE renter_user_id=?`, 
    [user.currentUser], (err, result) => {
      if (result != false && result[0].renter_user_id === user.currentUser) {
        db.query(`UPDATE books SET renter_user_id=? WHERE seq=?`, 
        ['', book.seq], (err, book) => {
          if (err) throw err;
          res.json(true);
        });
      } else {
        res.json(false);
      }
  });
});

// 모듈 내보내기
module.exports = router;