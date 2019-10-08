const { sequelize, Sequelize } = require('./index');
const Employer = require('./Employer');

const Job = sequelize.define('job', {
  job_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Employer,
      key: 'employer_id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Job;
