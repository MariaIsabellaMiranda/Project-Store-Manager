const salesSchema = require('./salesSchema');
const productsModels = require('../models/productsModels');
const salesModels = require('../models/salesModels');

const salesValidSchema = (productSales) => {
  for (let i = 0; i < productSales.length; i += 1) {
    const { error } = salesSchema.salesProductSchema.validate(productSales[i]);
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

const validationSales = async (productSales, id) => {
  const salesError = salesValidSchema(productSales);

  if (salesError) {
    return { code: Number(salesError.code), message: salesError.message };
  }

  const checkId = await checkProductId(productSales);

  if (checkId.includes(false)) {
    return { code: 404, message: 'Product not found' };
  }

  if (id) {
    const sales = await salesModels.getSalesId(id);
    if (!sales.length) return { code: 404, message: 'Sale not found' };
  }

  return false;
};

module.exports = { salesValidSchema, checkProductId, validationSales };