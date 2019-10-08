/* eslint-disable camelcase */
const Job = require('../model/Job');
const { sequelize } = require('../model/index');

module.exports = {
  getEmployerJobs: (employer_id, callback) => {
    const query = 'select jobs.job_id, jobs.title, jobs.description, employers.company from jobs, employers where jobs.employer_id = $1 AND jobs.employer_id = employers.employer_id;';
    sequelize.query(query, { bind: [employer_id], type: sequelize.QueryTypes.SELECT })
      .then((jobs) => {
        callback(null, jobs);
      })
      .catch((err) => {
        console.log('error getting jobs');
        console.log(err);
        callback(err);
      });
  },

  postJob: (title, description, employer_id, callback) => {
    Job.create({ employer_id, title, description })
      .then((job) => {
        callback(null, job);
      })
      .catch((err) => {
        console.log('error creating job');
        console.log(err);
        callback(err);
      });
  },

  getAllJobs: (callback) => {
    const query = 'select jobs.job_id, jobs.title, jobs.description, employers.company from jobs, employers where jobs.employer_id = employers.employer_id;';
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
      .then((jobs) => {
        callback(null, jobs);
      })
      .catch((err) => {
        console.log('error getting all jobs');
        console.log(err);
        callback(err);
      });
  },
};
