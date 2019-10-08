const Applicant = require('../model/Applicant');

module.exports = {
  createApplicant: (email, password, firstName, lastName, callback) => {
    Applicant.create({
      email, password, firstName, lastName,
    })
      .then((applicant) => {
        callback(null, applicant);
      })
      .catch((err) => {
        console.log('error creating applicant');
        console.log(err);
        callback(err);
      });
  },
};
