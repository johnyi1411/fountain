const Sequelize = require('sequelize');
const {
  user, host, database, password, port, dialect,
} = require('../config/pg.config');

const sequelize = new Sequelize(`${dialect}://${user}:${password}@${host}:${port}/${database}`);

module.exports = {
  sequelize, Sequelize,
};
