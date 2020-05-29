const express = require('express'),
  router = express.Router();

router.get('/', (req, res) => {
  res.render('home/home');
});

router.get('/sign-in', (req, res) => {
  res.render('home/sign-in');
});

module.exports = router;