const joi = require('joi');
const postSchema = joi.object({
  title: joi.string().max(25).required().messages({
    'string.max': '25자 이하로 입력해주세요',
    'any.required': '게시글 제목의 형식이 일치하지 않습니다.',
  }),
  content: joi.string().max(1000).required().messages({
    'string.max': '1000자 이하로 입력해주세요',
    'any.required': '게시글 내용의 형식이 일치하지 않습니다.',
  }),
});

module.exports = postSchema;
