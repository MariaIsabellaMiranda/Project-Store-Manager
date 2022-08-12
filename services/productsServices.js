const productsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const products = await productsModels.getAllProducts();

  return { code: 200, data: products };
};

const getProductById = async (id) => {
  const product = await productsModels.getProductById(id);

  if (!product.length) {
    return { code: 404, message: 'Product not found' };
  }

  return { code: 200, data: product };
};

module.exports = { getAllProducts, getProductById };