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
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.create({
    username,
    password: hashPass
  })
  .then(() => {
    res.redirect("/bars&beers");
  })
  .catch(error => {
    console.log(error);
  })
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", {errorMessage: "Please enter the username and password"});
});

router.post("/login", (req, res, next) => {
  const {username, password} = req.body;
  

  if (username === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to sign up."
    });
  } else {
    User.findOne({ "username": username })
    .then(user => {
        if (!user) {
          res.render("auth/login", {
            errorMessage: "The username doesn't exist."
          });
        } else if (bcrypt.compareSync(password, user.password)) {
            // Save the login in the session!
            req.session.currentUser = user;
            res.redirect("/bars&beers");
        } else {
          res.render("auth/login", {
            errorMessage: "Incorrect password"
          });
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
