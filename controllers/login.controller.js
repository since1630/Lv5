const LoginService = require('../services/login.service.js');
const loginSchema = require('../schemas/login.schema');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
class LoginController {
  loginService = new LoginService();
  login = async (req, res) => {
    try {
      const { nickname, password } = req.body;
      try {
        await loginSchema.validateAsync(req.body);
      } catch (err) {
        console.error(err);
        return res.status(400).json({ errorMessage: err.message });
      }

      const user = await this.loginService.findUser(nickname);

      // DB에 있는 유저의 패스워드와 현재 입력된 패스워드가 다르면 곧바로 login 함수 종료
      if (!user || password !== user.password) {
        res.status(412).json({
          errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
        });
        return;
      }

      // JWT 생성
      const token = jwt.sign(
        { userId: user.userId, nickname: user.nickname },
        process.env.SECRET_KEY
      );
      res.cookie('authorization', 'Bearer ' + token);

      return res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: '로그인에 실패하였습니다.' });
    }
  };
}

module.exports = LoginController;
