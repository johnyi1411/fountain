/* eslint-disable new-cap */
/* eslint-disable camelcase */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const pg = require('pg');
const pgSession = require('connect-pg-simple')(session);
const passport = require('./passport/index');
const config = require('../database/config/pg.config');

// Route requires
const employer = require('./route/employer');
const applicant = require('./route/applicant');
const job = require('./route/job');
const application = require('./route/application');

const app = express();
const pgPool = new pg.Pool(config);

// Port
const port = 80;

// Middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('public'));

// Sessions
app.use(session({
  secret: 'admiration-frequently',
  resave: false,
  saveUninitialized: false,
  store: new pgSession({
    pool: pgPool, // Connection pool
  }),
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/employer', employer);
app.use('/applicant', applicant);
app.use('/job', job);
app.use('/application', application);

// Start server
app.listen(port);

// Check if user has session
app.get('/user', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// General log out handler
app.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});
