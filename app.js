require('dotenv').config();

const createError = require('http-errors');
const flash = require('connect-flash');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

//uploed image
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// notifications handle
const { notifications } = require('./middlewares');

const indexRouter = require('./routes/index');
const BandBRouter = require('./routes/BandB');

// mongodb connect
const dbName = 'barsANDbeers';
(async () => {
  try{
    await mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true });
    console.log(`Conected to ${dbName}`);
  }catch{
    err => {
      console.error(`Error conecting to ${dbName}. `, err);
    }
  }
})();

const app = express();

// scss un css muy molon 
app.use(sassMiddleware({
  src: path.join(__dirname, 'SCSS'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
	sourceMap: true, // true for .map; false no .map file
}));

// app title
app.locals.title = "Bars&Beers";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

// middlewares
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60, // 1 day
  }),
  secret: 'basic-auth-secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
}));
app.use(flash());
app.use((req, res, next) => {
  // app.locals.currentUser = req.session.currentUser;
  res.locals.currentUser = req.session.currentUser;
  next();
});
app.use(notifications);

app.use('/', indexRouter);
app.use('/bars&beers', BandBRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
