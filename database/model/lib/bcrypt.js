const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword: (plainTextPassword) => bcrypt.hashSync(plainTextPassword, 10),
};
