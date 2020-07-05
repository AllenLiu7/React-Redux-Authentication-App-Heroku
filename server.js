const express = require('express');
const path = require('path');
const session = require('express-session');
const compression = require('compression');
const passport = require('passport');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
var enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//connect to DB

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(cors());

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   })
// );

connectDB();

require('./passport');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', require('./routes/api/login'));
app.use('/oauth', require('./routes/api/oauth'));
app.use('/signup', require('./routes/api/signup'));
app.use('/login_check', require('./routes/api/checkLogin'));
app.use('/logout', require('./routes/api/logout'));

//Handle Errors
app.use(function (error, req, res, next) {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});
