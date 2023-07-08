const joi = require('joi');
const commentSchema = joi.object({
  comment: joi.string().required().messages({
    'any.required': '데이터 형식이 올바르지 않습니다',
  }),
});

module.exports = commentSchema;
