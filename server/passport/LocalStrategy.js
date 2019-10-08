const LocalStrategy = require('passport-local').Strategy;
const Employer = require('../../database/model/Employer');

const strategy = new LocalStrategy(
  {
    usernameField: 'email',
  },
  ((email, password, done) => {
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
  }),
);

module.exports = strategy;
