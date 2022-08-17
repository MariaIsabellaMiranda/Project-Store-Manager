const productsServices = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  const { code, data } = await productsServices.getAllProducts();

  return res.status(code).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const { code, data, message } = await productsServices.getProductById(id);

  if (!data) return res.status(code).json({ message });

  return res.status(code).json(data[0]);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { code, data, message } = await productsServices.createProduct(name);

  if (!data) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { code, data, message } = await productsServices.updateProductById(
    id, name,
  );

  if (!data) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  const { code, message } = await productsServices.deleteProducts(id);

  if (message) return res.status(code).json({ message });

  return res.status(code).end();
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProducts,
};