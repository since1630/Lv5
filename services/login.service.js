const LoginRepository = require('../repositories/login.repository.js');
class LoginService {
  loginRepository = new LoginRepository();
  login = async (nickname, password) => {
    const user = await loginRepository.login(nickname);

    if (!user || password !== user.password) {
      res.status(412).json({
        errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
      });
      return;
    }

    // JWT 생성
    const token = jwt.sign(
      { userId: user.userId, nickname: user.nickname },
      'customized-secret-key'
      // 시크릿키는 내일 조정
    );
    res.cookie('authorization', 'Bearer ' + token);
  };
}
module.exports = LoginService;
