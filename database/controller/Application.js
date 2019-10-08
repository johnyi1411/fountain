/* eslint-disable camelcase */
const Application = require('../model/Application');
const { sequelize } = require('../model/index');

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

  getJobApplications: (job_id, callback) => {
    const query = 'select applications.applicant_id, applicants.first_name, applicants.last_name from applications, applicants where applications.applicant_id = applicants.applicant_id AND applications.job_id = $1;';
    sequelize.query(query, { bind: [job_id], type: sequelize.QueryTypes.SELECT })
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
