const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Beer = require('../models/beer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('BandB/homePage', { title: 'Bars&Beers'});
});

router.get('/createBeer', function(req, res, next) {
  res.render('BandB/createBeer', { title: 'Bars&Beers'});
});

router.post('/createBeer', (req, res, next) => {
  const {name, description} = req.body;
  Beer.create({
    name,
    description,
  
  })
  .then((beer) => {
    res.redirect("/bars&beers/beers");
  })
  .catch(error => {
    console.log(error);
  })
});

router.get('/beers', function(req, res, next) {
  Beer.find()
  .then((beers) => {
  res.render('BandB/beerlist', { title: 'Bars&Beers', beers});
  })
  .catch((error) => {
    next(error);
  });
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
