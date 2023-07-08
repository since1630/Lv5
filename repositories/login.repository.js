const { Users } = require('../models');

class LoginRepository {
  login = async (nickname) => {
    await Users.findOne({ where: { nickname } });
  };
}

module.exports = LoginRepository;
