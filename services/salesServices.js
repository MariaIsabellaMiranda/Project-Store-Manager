const salesModels = require('../models/salesModels');

const createSales = async (productSales) => {
  const { id } = await salesModels.createIdSales();

  const sales = await Promise.all(
    productSales.map(({ productId, quantity }) =>
    salesModels.createSales({ id, productId, quantity })),
    );
    
  return {
    code: 201,
    data: {
      id,
      itemsSold: sales,
    },
  };
};

module.exports = { createSales };