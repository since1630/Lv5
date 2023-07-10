const LoginRepository = require('../repositories/login.repository.js');
class LoginService {
  loginRepository = new LoginRepository();

  findUser = async (nickname) => {
    const user = await this.loginRepository.findUser(nickname);
    return user;
  };
}
module.exports = LoginService;
