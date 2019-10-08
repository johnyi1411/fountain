const passport = require('passport');
const LocalStrategy = require('./LocalStrategy');
const Employer = require('../../database/model/Employer');

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  console.log('*** serializeUser called, user: ');
  console.log(user); // the whole raw user object!
  console.log('---------');
  done(null, user.dataValues.employer_id);
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  console.log('DeserializeUser called');
  console.log(id);
  Employer.findOne({ where: { employer_id: id } })
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
});

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;
