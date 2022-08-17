const salesModels = require('../models/salesModels');
const salesValidation = require('../utils/salesValidation');

const createSales = async (productSales) => {
  const checkSales = await salesValidation.validationSales(productSales);
  
  if (checkSales) return checkSales;

  const { id } = await salesModels.createIdSales();

  const sales = await Promise.all(
    productSales.map(({ productId, quantity }) =>
    salesModels.createSales({ id, productId, quantity })),
    );

  return { code: 201, data: { id, itemsSold: sales } };
};

const getAllSales = async () => {
  const sales = await salesModels.getAllSales();

  return { code: 200, data: sales };
};

const getSalesId = async (id) => {
  const sales = await salesModels.getSalesId(id);

  if (!sales.length) return { code: 404, message: 'Sale not found' };

  return { code: 200, data: sales };
};

const deleteSales = async (id) => {
  const sales = await salesModels.getSalesId(id);

  if (!sales.length) return { code: 404, message: 'Sale not found' };

  await salesModels.deleteSales(id);

  return { code: 204 };
};

const updateSales = async (productSales, id) => {
  const checkSales = await salesValidation.validationSales(productSales, id);
  
  if (checkSales) return checkSales;

  const salesUpdate = await Promise.all(
    productSales.map(({ productId, quantity }) =>
      salesModels.updateSales({ id, productId, quantity })),
  );

  return { code: 200, data: { saleId: id, itemsUpdated: salesUpdate } };
};

module.exports = { createSales, getAllSales, getSalesId, deleteSales, updateSales };