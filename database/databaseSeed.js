/* eslint-disable no-console */
const Employer = require('./model/Employer');
const Applicant = require('./model/Applicant');
const Job = require('./model/Job');
const Application = require('./model/Application');

Employer.sync()
  .then(() => {
    console.log('Employer table created');
    Applicant.sync()
      .then(() => {
        console.log('Applicant table created');
        Job.sync()
          .then(() => {
            console.log('Job table created');
            Application.sync()
              .then(() => console.log('Application table created'))
              .catch((err) => console.log('Error creating Application table', err));
          })
          .catch((err) => console.log('Error creating Job table', err));
      })
      .catch((err) => console.log('Error creating Applicant table', err));
  })
  .catch((err) => console.log('Error creating employer table', err));
