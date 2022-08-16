const salesModels = require('../models/salesModels');
const salesValidation = require('../utils/salesValidation');

const createSales = async (productSales) => {
  const salesError = salesValidation.salesValidSchema(productSales);
  if (salesError) return { code: Number(salesError.code), message: salesError.message };
  
  const checkProductId = await salesValidation.checkProductId(productSales);

  if (checkProductId.includes(false)) return { code: 404, message: 'Product not found' };

  const { id } = await salesModels.createIdSales();

  const sales = await Promise.all(
    productSales.map(({ productId, quantity }) =>
    salesModels.createSales({ id, productId, quantity })),
    );

  return { code: 201, data: { id, itemsSold: sales } };
};

module.exports = { createSales };