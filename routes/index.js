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
  res.render("auth/login");
});
module.exports = router;
