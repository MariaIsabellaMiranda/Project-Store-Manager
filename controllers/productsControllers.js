const productsServices = require('../services/produtcsServices');

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

module.exports = { getAllProducts, getProductById };