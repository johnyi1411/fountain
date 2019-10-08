/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const { sequelize, Sequelize } = require('./Models');
const { hashPassword } = require('./lib/bcrypt');

const { Model } = Sequelize;

class Employer extends Model {
  checkPassword(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  }
}

Employer.init({
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
}, {
  sequelize,
  modelName: 'employer',
  hooks: {
    beforeCreate: (employer) => {
      employer.password = hashPassword(employer.password);
    },
  },
});

module.exports = Employer;
