const connection = require('./connection');

const createIdSales = async () => {
  const [sales] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  return { id: sales.insertId };
};

const createSales = async (salesProducts) => {
  const { id, productId, quantity } = salesProducts;
  
  const [sales] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`, [id, productId, quantity],
  );

  return { productId, quantity, id: sales.insertId };
};

module.exports = { createIdSales, createSales };