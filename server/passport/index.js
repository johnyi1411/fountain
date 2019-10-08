const passport = require('passport');
const LocalStrategy = require('./LocalStrategy');
const Employer = require('../../database/model/Employer');
const Applicant = require('../../database/model/Applicant');

passport.serializeUser((user, done) => {
  done(null, {
    id: user.dataValues.employer_id || user.dataValues.applicant_id,
    userType: user.dataValues.employer_id ? 'employer' : 'applicant',
  });
});

passport.deserializeUser((user, done) => {
  if (user.userType === 'employer') {
    Employer.findOne({ where: { employer_id: user.id } })
      .then((employer) => {
        done(null, employer);
      })
      .catch((error) => {
        console.log('deserialize error:');
        console.log(error);
      });
  }

  if (user.userType === 'applicant') {
    Applicant.findOne({ where: { applicant_id: user.id } })
      .then((applicant) => {
        done(null, applicant);
      })
      .catch((error) => {
        console.log('deserialize error:');
        console.log(error);
      });
  }
});

passport.use(LocalStrategy);

module.exports = passport;
