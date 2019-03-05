const express = require('express');
const router = express.Router();
// User model
const User           = require("../models/user");
// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Bars&Beers'});
});


router.get("/signup", (req, res, next) => {
  res.render("auth/signup", {errorMessage: req.flash('error')});
});

router.post("/signup", (req, res, next) => {
  const {username, password, neighbourhood, beerType} = req.body;
  
  if (username === '' || password === '' ) {
    req.flash('error', 'please enter a username or password');
    return res.redirect('/signup');
  }
  User.findOne({username})
    .then((user) => {
      if(user){
        req.flash('error', 'this username already exists');
        return res.redirect('/signup');
      } else {
        const salt     = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        User.create({
          username,
          password: hashPass,
          neighbourhood,
          beerType,
        })
        .then((user) => {
          req.session.currentUser = user;
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

router.get("/login", (req, res, next) => {
  res.render("auth/login", {errorMessage: req.flash('error')});
});

router.post("/login", (req, res, next) => {
  const {username, password} = req.body;
  

  if (username === "" || password === "") {
    req.flash('error', 'please enter a username or password');
    return res.redirect("/login", );
  } else {
    User.findOne({ "username": username })
    .then(user => {
        if (!user) {
          req.flash('error', 'this username does not exists')
          return res.redirect("/login");
        } else if (bcrypt.compareSync(password, user.password)) {
          // Save the login in the session!
          req.session.currentUser = user;
          req.flash('success', 'successful login!');
          return res.redirect("/bars&beers");
        } else {
          req.flash('error', 'incorrect user');
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
