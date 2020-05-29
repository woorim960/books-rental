const express = require('express'),
  router = express.Router();

router.get('/', (req, res) => {
  res.render('home/home');
});

router.get('/sign-in', (req, res) => {
  res.render('home/sign-in');
});

router.get('/sign-up', (req, res) => {
  res.render('home/sign-up');
});

module.exports = router;