const joi = require('joi');
const loginSchema = joi.object({
  nickname: joi.string().alphanum().min(3).required().messages({
    'string.base': '닉네임의 형식이 일치하지 않습니다.',
    'string.alphanum': '닉네임의 형식이 일치하지 않습니다.',
    'string.min': '최소 3글자 이상 입력하세요',
    'any.required': '닉네임을 입력해주세요',
  }),
  password: joi.string().min(4).required().messages({
    'string.base': '비밀번호는 문자열이어야 합니다',
    'string.min': '최소 4글자 이상 입력하세요',
    'any.required': '비밀번호를 입력해주세요',
  }),
});

module.exports = loginSchema;
