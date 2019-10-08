/* eslint-disable camelcase */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const pg = require('pg');
const passport = require('./passport/index');
const pgSession = require('connect-pg-simple')(session);
const config = require('../database/config/pg.config');

const EmployerController = require('../database/controller/Employer');
const ApplicantController = require('../database/controller/Applicant');
const JobController = require('../database/controller/Job');
const ApplicationController = require('../database/controller/Application');

const port = 3000;

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('public'));

const pgPool = new pg.Pool(config);

app.use(session({
  secret: 'admiration-frequently',
  resave: false,
  saveUninitialized: false,
  store: new pgSession({
    pool: pgPool, // Connection pool
  }),
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
}));

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
    res.send(result);
  });
});

app.post('/employer/login',
  passport.authenticate('local'),
  (req, res) => {
    const { employer_id, email } = req.user.dataValues;
    const userInfo = {
      employer_id,
      email,
    };
    res.send(userInfo);
  });

app.get('/user', (req, res) => {
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


// -----------APPLICANT ROUTES--------------

app.post('/applicant/signup', (req, res) => {
  const {
    email, password, firstName, lastName,
  } = req.body;
  ApplicantController.createApplicant(email, password, firstName, lastName, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
  });
});

app.post('/applicant/login',
  passport.authenticate('local'),
  (req, res) => {
    const { applicant_id, email } = req.user.dataValues;
    const userInfo = {
      applicant_id,
      email,
    };
    res.send(userInfo);
  });

// -------- EMPLOYER JOBS -----------
app.get('/employer/:id/job', (req, res) => {
  JobController.getEmployerJobs(req.params.id, (error, results) => {
    if (error) {
      console.log('error getting jobs', error);
      return;
    }
    res.send(results);
  });
});

app.post('/employer/:id/job', (req, res) => {
  const { title, description, id } = req.body;
  JobController.postJob(title, description, id, (error, results) => {
    if (error) {
      console.log('error creating job', error);
      return;
    }
    res.send(results);
  });
});

app.get('/employer/:employer/job/:jobId/applicant', (req, res) => {
  ApplicationController.getJobApplications(req.params.jobId, (error, results) => {
    if (error) {
      console.log('error getting jobs', error);
      return;
    }
    res.send(results);
  });
});

// -------- APPLICANT JOBS -----------
app.get('/job', (req, res) => {
  JobController.getAllJobs((error, results) => {
    if (error) {
      console.log('error getting jobs', error);
      return;
    }
    res.send(results);
  });
});

app.post('/application', (req, res) => {
  const { applicantId, jobId } = req.body;
  ApplicationController.createApplication(applicantId, jobId, (error, results) => {
    if (error) {
      console.log('error creating application', error);
      return;
    }
    res.send(results);
  });
});

app.get('/applicant/:id/application', (req, res) => {
  ApplicationController.getApplicantApplications(req.params.id, (error, results) => {
    if (error) {
      console.log('error getting applicant applications', error);
      return;
    }
    res.send(results);
  });
});
