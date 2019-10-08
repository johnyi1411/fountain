const Employer = require('../model/Employer');

module.exports = {
  createEmployer: (email, password, company, callback) => {
    Employer.create({ email, password, company })
      .then((employer) => {
        callback(null, employer);
      })
      .catch((err) => {
        console.log('error creating employer');
        console.log(err);
        callback(err);
      });
  },
};
