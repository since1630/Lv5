const SignupService = require('../services/signup.service.js');
const signupSchema = require('../schemas/signup.schema.js');

class SignupController {
  signupService = new SignupService();

  signup = async (req, res) => {
    const { nickname, password } = req.body;
    try {
      await signupSchema.validateAsync(req.body).catch((err) => {
        throw new Error(err.message);
      });

      //* 중복된 유저 찾기
      const user = await this.signupService.findUser(nickname);
      if (user)
        return res.status(412).json({ errorMessage: '중복된 닉네임입니다.' });

      //* 회원가입
      await this.signupService.signup(nickname, password);
      return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: err.message });
    }
  };
}

module.exports = SignupController;
