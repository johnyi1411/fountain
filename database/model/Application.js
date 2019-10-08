const { sequelize, Sequelize } = require('./index');
const Applicant = require('./Applicant');
const Job = require('./Job');

const Application = sequelize.define('application', {
  application_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  applicant_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Applicant,
      key: 'applicant_id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  job_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Job,
      key: 'job_id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
});

module.exports = Application;
