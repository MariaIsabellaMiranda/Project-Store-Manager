const productsModels = require('../models/productsModels');
const productsValidationSchema = require('../utils/productsValidationSchema');

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
  const validName = productsValidationSchema.nameValidSchema(name);

  if (validName) return validName;

  const { id } = await productsModels.createProduct(name);

  return { code: 201, data: { id, name } };
};

const updateProductById = async (id, name) => {
  const validName = productsValidationSchema.nameValidSchema(name);

  if (validName) return validName;

  const checkId = await productsModels.getProductById(id);

  if (!checkId) return { code: 404, message: 'Product not found' };

  const newProduct = await productsModels.updateProductById(id, name);

  return { code: 200, data: newProduct };
};

const deleteProducts = async (id) => {
  const checkId = await productsModels.getProductById(id);

  if (!checkId) return { code: 404, message: 'Product not found' };

  await productsModels.deleteProducts(id);

  return { code: 204 };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProducts,
};