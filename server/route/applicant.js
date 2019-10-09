/* eslint-disable camelcase */
const express = require('express');
const passport = require('../passport/index');
const ApplicantController = require('../../database/controller/Applicant');
const ApplicationController = require('../../database/controller/Application');

const router = express.Router();

router.post('/signup', (req, res) => {
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

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    const { applicant_id, email } = req.user.dataValues;
    const userInfo = {
      applicant_id,
      email,
    };
    res.send(userInfo);
  });

router.get('/:id/application', (req, res) => {
  ApplicationController.getApplicantApplications(req.params.id, (error, results) => {
    if (error) {
      console.log('error getting applicant applications', error);
      return;
    }
    res.send(results);
  });
});

module.exports = router;
