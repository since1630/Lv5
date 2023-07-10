const joi = require('joi');
const postSchema = joi.object({
  title: joi.string().max(25).required().messages({
    'string.max': '25자 이내로 입력해주세요',
    'any.required': '게시글 제목의 형식이 일치하지 않습니다.',
    'string.empty': '게시글의 제목을 작성해주세요',
  }),
  content: joi.string().max(1000).required().messages({
    'string.max': '1000자 이내로 입력해주세요',
    'any.required': '게시글 내용의 형식이 일치하지 않습니다.',
    'string.empty': '게시글 내용을 작성해주세요',
  }),
});

module.exports = postSchema;
