/* eslint-disable camelcase */
const Applicant = require('../model/Applicant');

module.exports = {
  createApplicant: (email, password, first_name, last_name, callback) => {
    Applicant.create({
      email, password, first_name, last_name,
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
