const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Beer = require('../models/beer');

/* GET bars&beers homepage. */
router.get('/', function(req, res, next) {
  res.render('BandB/homePage', { title: 'Bars&Beers'});
});

/* GET-POST page create beer Form */
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

/* GET-POST  updateBeer page and updateFORM */
router.get('/:id/updateBeer', (req, res, next) => {
  const {id} = req.params;
  Beer.findById(id)
    .then((beer) => {
      res.render('BandB/updateBeer', {beer});
    }) 
    .catch((error) => {
      next(error);
    })
});

router.post('/:id', (req, res, next) => {
  const {id} = req.params;
  const {name, description} = req.body;
  Beer.findByIdAndUpdate(id, {name, description})
    .then((beer) => {
      res.redirect("/bars&beers/beers");
    }) 
    .catch((error) => {
      next(error);
    })
});

/* POST  deleteBeer page */

router.post('/:id/delete', (req, res, next) => {
  const {id} = req.params;
  Beer.findByIdAndDelete(id)
    .then((beer) => {
      res.redirect("/bars&beers/beers");
    }) 
    .catch((error) => {
      next(error);
    })
});

/* GET beerlist page. */
router.get('/beers', function(req, res, next) {
  Beer.find()
  .then((beers) => {
  res.render('BandB/beerlist', { title: 'Bars&Beers', beers});
  })
  .catch((error) => {
    next(error);
  });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  User.find()
  .then((users) => {
  res.render('BandB/userlist', { title: 'Bars&Beers', users});
  })
  .catch((error) => {
    next(error);
  });
});

/* GET newbars FORM page*/
router.get('/newbars', function(req, res, next) {
  res.render('BandB/newbars', { title: 'Bars&Beers'});
});

module.exports = router;
