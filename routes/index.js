const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
// User model
const User           = require("../models/user");
const Beer = require('../models/beer');
const middlewares = require('../middlewares');
// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'img',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 150, height: 150, crop: 'limit' }],
});

const parser = multer({ storage });

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Bars&Beers', layout: 'layouts/home'});
});


router.get("/signup", middlewares.anonRoute, (req, res, next) => {
  Beer.find()
  .then((beers) => {
    res.render("auth/signup", {errorMessage: req.flash('error'), beers, layout: 'layouts/home'});
  })
  .catch((error) => {
    next(error);
  })
});

router.post("/signup", parser.single('image'), middlewares.anonRoute, (req, res, next) => {
  const {username, password, city, neighbourhood, beerType, favouriteBeers} = req.body;
  
  if (username === '' || password === '' ) {
    req.flash('error', 'Please enter a username or password');
    return res.redirect('/signup');
  }
  User.findOne({username})
    .then((user) => {
      if(user){
        req.flash('error', 'This username already exists');
        return res.redirect('/signup');
      } else {
        const salt     = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
        const userimage = req.file.url;
        User.create({
          username,
          password: hashPass,
          city,
          neighbourhood,
          beerType,
          favouriteBeers,
          userimage,
        })
        .then((user) => {
          req.session.currentUser = user;
          req.flash('success', 'Successful signup!');
          res.redirect("/bars&beers");
        })
        .catch((error) => {
          next(error);
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/login", middlewares.anonRoute, (req, res, next) => {
  res.render("auth/login", {errorMessage: req.flash('error'), layout: 'layouts/home'});
});

router.post("/login", middlewares.anonRoute, (req, res, next) => {
  const {username, password} = req.body;
  

  if (username === "" || password === "") {
    req.flash('error', 'Please enter a username or password');
    return res.redirect("/login", );
  } else {
    User.findOne({ "username": username })
    .then(user => {
        if (!user) {
          req.flash('error', 'This username does not exists')
          return res.redirect("/login");
        } else if (bcrypt.compareSync(password, user.password)) {
          // Save the login in the session!
          req.session.currentUser = user;
          req.flash('success', 'Successful login!');
          return res.redirect("/bars&beers");
        } else {
          req.flash('error', 'Incorrect user');
          return res.redirect("/login");
        }
    })
    .catch(error => {
      next(error);
    })
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});
module.exports = router;
