/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const { sequelize, Sequelize } = require('./index');
const { hashPassword } = require('./lib/bcrypt');

const { Model } = Sequelize;

class Applicant extends Model {
  checkPassword(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  }
}

Applicant.init({
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
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'applicant',
  hooks: {
    beforeCreate: (applicant) => {
      applicant.password = hashPassword(applicant.password);
    },
  },
});

module.exports = Applicant;
