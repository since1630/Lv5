const joi = require('joi');

const signupSchema = joi.object({
  nickname: joi.string().alphanum().min(3).required().messages({
    'string.base': '닉네임의 형식이 일치하지 않습니다.',
    'string.alphanum': '닉네임의 형식이 일치하지 않습니다.',
    'string.min': '최소 3글자 이상 입력하세요',
    'string.empty': '닉네임을 입력해주세요',
    'any.required': '요청한 데이터의 형식이 올바르지 않습니다',
  }),
  password: joi.string().min(4).required().messages({
    'string.base': '비밀번호는 문자열이어야 합니다',
    'string.min': '최소 4글자 이상 입력하세요',
    'string.empty': '비밀번호를 입력해주세요',
    'any.required': '요청한 데이터의 형식이 올바르지 않습니다',
  }),
  confirm: joi.string().valid(joi.ref('password')).required().messages({
    'string.base': '확인 비밀번호는 문자열이어야 합니다',
    'any.only': '비밀번호가 일치해야 합니다',
    'string.empty': '비밀번호를 입력해주세요',
    'any.required': '요청한 데이터의 형식이 올바르지 않습니다',
  }),
});

module.exports = signupSchema;

// const regex = /[^a-zA-Z0-9]/g;
// if (!nickname || !password || !confirm) {
//   return res.status(400).json({ errorMessage: '항목을 모두 적으세요' });
// }
// //? 체크 완료
// // 닉네임 형식이 비정상적인 경우
// if (nickname.length < 3 || nickname.search(regex) !== -1) {
//   return res
//     .status(412)
//     .json({ errorMessage: '닉네임의 형식이 일치하지 않습니다.' });
// }

// //? 체크완료
// //패스워드 형식이 비정상적인 경우
// if (password.length < 4) {
//   return res
//     .status(412)
//     .json({ errorMessage: '패스워드 형식이 일치하지 않습니다.' });
// }

// //? 체크 완료
// //  패스워드에 닉네임이 포함되어 있는지 여부
// if (nickname.includes(password)) {
//   return res
//     .status(412)
//     .json({ errorMessage: '패스워드에 닉네임이 포함되어 있습니다.' });
// }

// if (password !== confirm) {
//   //? 체크 완료
//   // 패스워드 일치 확인
//   return res
//     .status(412)
//     .json({ errorMessage: '패스워드가 일치하지 않습니다.' });
// }
