/* eslint-disable camelcase */
const Application = require('../model/Application');

module.exports = {
  createApplication: (applicant_id, job_id, callback) => {
    Application.create({ applicant_id, job_id })
      .then((application) => {
        callback(null, application);
      })
      .catch((err) => {
        console.log('error creating application');
        console.log(err);
        callback(err);
      });
  },

  getApplicantApplications: (applicant_id, callback) => {
    Application.findAll({ where: { applicant_id } })
      .then((applications) => {
        callback(null, applications);
      })
      .catch((err) => {
        console.log('error creating application');
        console.log(err);
        callback(err);
      });
  },
};
