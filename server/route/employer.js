/* eslint-disable camelcase */
const express = require('express');
const passport = require('../passport/index');
const EmployerController = require('../../database/controller/Employer');
const JobController = require('../../database/controller/Job');
const ApplicationController = require('../../database/controller/Application');

const router = express.Router();

router.post('/signup', (req, res) => {
  const { email, password, company } = req.body;
  EmployerController.createEmployer(email, password, company, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
  });
});

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    const { employer_id, email } = req.user.dataValues;
    const userInfo = {
      employer_id,
      email,
    };
    res.send(userInfo);
  });

// -------- EMPLOYER JOBS -----------
router.get('/:id/job', (req, res) => {
  JobController.getEmployerJobs(req.params.id, (error, results) => {
    if (error) {
      console.log('error getting jobs', error);
      return;
    }
    res.send(results);
  });
});

router.post('/:id/job', (req, res) => {
  const { title, description, id } = req.body;
  JobController.postJob(title, description, id, (error, results) => {
    if (error) {
      console.log('error creating job', error);
      return;
    }
    res.send(results);
  });
});

router.get('/:employer/job/:jobId/applicant', (req, res) => {
  ApplicationController.getJobApplications(req.params.jobId, (error, results) => {
    if (error) {
      console.log('error getting jobs', error);
      return;
    }
    res.send(results);
  });
});

module.exports = router;
