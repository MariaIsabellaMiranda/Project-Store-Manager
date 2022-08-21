const joi = require('joi');

const salesProductSchema = joi.object({
  productId: joi.number().strict().required().messages({
    'any.required': '400|"productId" is required',
  }),
  quantity: joi.number().strict().min(1).required()
.messages({
    'any.required': '400|"quantity" is required',
    'number.min': '422|"quantity" must be greater than or equal to 1',
  }),
});

module.exports = { salesProductSchema };