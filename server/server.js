/* eslint-disable camelcase */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./passport/index');

const EmployerController = require('../database/controller/Employer');
const ApplicantController = require('../database/controller/Applicant');

const port = 3000;

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  secret: 'admiration-frequently',
  resave: false,
  saveUninitialized: false,
}));
// log to view session
app.use((req, res, next) => {
  console.log('req.session', req.session);
  return next();
});

app.use(passport.initialize());
app.use(passport.session());

app.listen(port);

app.post('/employer/signup', (req, res) => {
  const { email, password, company } = req.body;
  EmployerController.createEmployer(email, password, company, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    console.log('user signup');
    // old sign up session
    // req.session.email = req.body.email;
    res.send(result);
  });
});

app.post('/employer/login', (req, res, next) => {
  console.log('/employer, login, req.body: ');
  console.log(req.body);
  next();
},
passport.authenticate('local'),
(req, res) => {
  console.log('logged in', req.user);
  const { employer_id, email } = req.user.dataValues;
  const userInfo = {
    employer_id,
    email,
  };
  res.send(userInfo);
});

app.get('/user', (req, res) => {
  console.log('===== user!!======');
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

app.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});


// APPLICANT ROUTES

app.post('/applicant/signup', (req, res) => {
  const {
    email, password, firstName, lastName,
  } = req.body;
  ApplicantController.createApplicant(email, password, firstName, lastName, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    console.log('user signup');
    // old sign up session
    // req.session.email = req.body.email;
    res.send(result);
  });
});

app.post('/applicant/login', (req, res, next) => {
  console.log('/applicant, login, req.body: ');
  console.log(req.body);
  next();
},
passport.authenticate('local'),
(req, res) => {
  console.log('logged in', req.user);
  const { applicant_id, email } = req.user.dataValues;
  const userInfo = {
    applicant_id,
    email,
  };
  res.send(userInfo);
});
