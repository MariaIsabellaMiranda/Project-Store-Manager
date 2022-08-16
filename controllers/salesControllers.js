const salesServices = require('../services/salesServices');

const createSales = async (req, res) => {
  const productsSales = req.body;

  const { code, data, message } = await salesServices.createSales(productsSales);

  if (!data) return res.status(code).json({ message });

  res.status(code).json(data);
};

const getAllSales = async (req, res) => {
  const { code, data } = await salesServices.getAllSales();

  res.status(code).json(data);
};

module.exports = { createSales, getAllSales };