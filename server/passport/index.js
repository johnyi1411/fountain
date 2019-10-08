const passport = require('passport');
const LocalStrategy = require('./LocalStrategy');
const Employer = require('../../database/model/Employer');
const Applicant = require('../../database/model/Applicant');

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  console.log('*** serializeUser called, user: ');
  console.log(user); // the whole raw user object!
  console.log('---------');
  done(null, {
    id: user.dataValues.employer_id || user.dataValues.applicant_id,
    userType: user.dataValues.employer_id ? 'employer' : 'applicant',
  });
});

// user object attaches to the request as req.user
passport.deserializeUser((user, done) => {
  console.log('DeserializeUser called');
  console.log(user);
  if (user.userType === 'employer') {
    Employer.findOne({ where: { employer_id: user.id } })
      .then((employer) => {
        console.log('*** Deserialize user, user:');
        console.log(employer);
        console.log('--------------');
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
        console.log('*** Deserialize user, user:');
        console.log(applicant);
        console.log('--------------');
        done(null, applicant);
      })
      .catch((error) => {
        console.log('deserialize error:');
        console.log(error);
      });
  }
});

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;
