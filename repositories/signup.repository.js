const { Users } = require('../models');

class SignupRepository {
  signup = async (nickname, password) => {
    await Users.create({ nickname, password });
  };
  findUser = async (nickname) => {
    const user = await Users.findOne({ where: { nickname } });
    return user;
  };
}

module.exports = SignupRepository;
