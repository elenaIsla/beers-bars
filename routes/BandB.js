const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('BandB/homePage', { title: 'Bars&Beers'});
});

router.get('/beers', function(req, res, next) {
  res.render('BandB/beerlist', { title: 'Bars&Beers'});
});

router.get('/users', function(req, res, next) {
  res.render('BandB/userlist', { title: 'Bars&Beers'});
});

router.get('/newbars', function(req, res, next) {
  res.render('BandB/newbars', { title: 'Bars&Beers'});
});

module.exports = router;
