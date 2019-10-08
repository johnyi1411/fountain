const Sequelize = require('sequelize');
const config = require('../config/pg.config');

const sequelize = new Sequelize(config);

module.exports = {
  sequelize, Sequelize,
};
