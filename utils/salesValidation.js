const salesSchema = require('./salesSchema');
const productsModels = require('../models/productsModels');

const salesValidSchema = (productSales) => {
  for (let i = 0; i < productSales.length; i += 1) {
    const { error } = salesSchema.salesProductSchema.validate(productSales[i]);
    console.log(error);
    if (error) {
      const [code, message] = error.message.split('|');

      return { code, message };
    }
  }
};

const checkProductId = async (productSales) => {
  const check = await Promise.all(
    productSales.map(({ productId, _quantity }) =>
      productsModels.getProductById(productId)),
  );

  return check;
};

module.exports = { salesValidSchema, checkProductId };