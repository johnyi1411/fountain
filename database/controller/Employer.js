const { Employer } = require('../model/Models');

module.exports = {
  createEmployer: (email, password, company, callback) => {
    Employer.create({ email, password, company })
      .then((employer) => {
        console.log(employer.id);
        callback(null, employer);
      })
      .catch((err) => {
        console.log('error creating employer');
        console.log(err);
        callback(err);
      });
  },

  // loginEmployer: (email, password, callback) => {
  //   Employer.
  // }
};
