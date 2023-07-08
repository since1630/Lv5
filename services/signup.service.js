const SignupRepository = require('../repositories/signup.repository.js');

class SignupService {
  signupRepository = new SignupRepository();

  signup = async (nickname, password) => {
    //? 체크 완료
    //todo 닉네임 중복 확인 >>> 이 부분도 쪼개야 할 듯.
    //   console.log(this.signupRepository);

    await this.signupRepository.signup(nickname, password);

    //   //* 회원가입 성공
    //   if (!nickname || !password) {
    //     return res
    //       .status(400)
    //       .json({ errorMessage: '닉네임 또는 비밀번호를 입력하지 않았습니다' });
    //   }
    //   return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
  };
  findUser = async (nickname) => {
    const user = await this.signupRepository.findUser(nickname);
    if (user) return user;
    else return;
  };
}

module.exports = SignupService;
