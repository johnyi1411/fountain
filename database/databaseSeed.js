/* eslint-disable no-console */
const {
  Employer, Applicant, Job, Application,
} = require('./model/Models');

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
