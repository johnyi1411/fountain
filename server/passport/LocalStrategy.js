const LocalStrategy = require('passport-local').Strategy;
const Employer = require('../../database/model/Employer');
const Applicant = require('../../database/model/Applicant');

const strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true,
  },
  ((req, email, password, done) => {
    console.log('LocalStrategy callback');
    console.log(req.body);
    if (req.body.userType === 'employer') {
      Employer.findOne({ where: { email } })
        .then((employer) => {
          if (!employer) {
            return done(null, false, { message: 'Incorrect email' });
          }
          if (!employer.checkPassword(password)) {
            return done(null, false, { message: 'Incorrect password' });
          }
          return done(null, employer);
        })
        .catch((error) => done(error));
    }

    if (req.body.userType === 'applicant') {
      Applicant.findOne({ where: { email } })
        .then((applicant) => {
          if (!applicant) {
            return done(null, false, { message: 'Incorrect email' });
          }
          if (!applicant.checkPassword(password)) {
            return done(null, false, { message: 'Incorrect password' });
          }
          return done(null, applicant);
        })
        .catch((error) => done(error));
    }
  }),
);

module.exports = strategy;
