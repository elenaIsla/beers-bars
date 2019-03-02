const express = require('express');
const router = express.Router();
const User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('BandB/homePage', { title: 'Bars&Beers'});
});

router.get('/beers', function(req, res, next) {
  res.render('BandB/beerlist', { title: 'Bars&Beers'});
});

router.get('/users', function(req, res, next) {
  User.find()
  .then((users) => {
  res.render('BandB/userlist', { title: 'Bars&Beers', users});
  })
  .catch((error) => {
    next(error);
  });
});

router.get('/newbars', function(req, res, next) {
  res.render('BandB/newbars', { title: 'Bars&Beers'});
});

module.exports = router;
