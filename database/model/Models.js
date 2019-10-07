const Sequelize = require('sequelize');
const config = require('../config/pg.config');

const sequelize = new Sequelize(config);

const Employer = sequelize.define('employer', {
  employer_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Applicant = sequelize.define('applicant', {
  applicant_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

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

module.exports = {
  Employer, Applicant, Job, Application,
};
