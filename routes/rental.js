// routes/rental.js
'user strict';

const express = require('express'),
  router = express.Router(),
  db = require('../db/db');

// 대여 목록 조회 페이지 이동
router.get('/list', (req, res) => {
  res.render('rental/rental-list');
});

module.exports = router;