const LoginService = require('../services/login.service.js');
const loginSchema = require('../schemas/login.schema');

class LoginController {
  loginService = new LoginService();
  login = async (req, res) => {
    const { nickname, password } = req.body;

    await loginSchema.validateAsync(req.body).catch((err) => {
      console.error(err);
      return res.status(400).json({
        errorMessage: '로그인에 실패하였습니다.',
      });
    });
    const token = await loginService.login(nickname, password);
    res.status(200).json({ token });
  };
}

module.exports = LoginController;
