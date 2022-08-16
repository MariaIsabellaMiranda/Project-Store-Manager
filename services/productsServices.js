const productsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const products = await productsModels.getAllProducts();

  return { code: 200, data: products };
};

const getProductById = async (id) => {
  const product = await productsModels.getProductById(id);

  if (!product) {
    return { code: 404, message: 'Product not found' };
  }

  return { code: 200, data: product };
};

const createProduct = async (name) => {
  if (!name) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
 return {
    code: 422, message: '"name" length must be at least 5 characters long',
  }; 
}

  const { id } = await productsModels.createProduct(name);

  return { code: 201, data: { id, name } };
};

module.exports = { getAllProducts, getProductById, createProduct };