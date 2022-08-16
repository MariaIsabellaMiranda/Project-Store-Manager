const connection = require('./connection');
const serialize = require('../utils/serialize');

const createIdSales = async () => {
  const [sales] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  return { id: sales.insertId };
};

const createSales = async (salesProducts) => {
  const { id, productId, quantity } = salesProducts;
  
  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`, [id, productId, quantity],
  );

  return { productId, quantity };
};

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT saPrt.sale_id, sa.date, saPrt.product_id, saPrt.quantity
    FROM StoreManager.sales_products AS saPrt
    INNER JOIN StoreManager.sales AS sa ON saPrt.sale_id = sa.id
    ORDER BY saPrt.sale_id, saPrt.product_id;`,
  );

  return serialize(sales);
};

const getSalesId = async (id) => {
  const [sales] = await connection.execute(
    `SELECT saPrt.sale_id, sa.date, saPrt.product_id, saPrt.quantity
    FROM StoreManager.sales_products AS saPrt
    INNER JOIN StoreManager.sales AS sa ON saPrt.sale_id = sa.id
    WHERE saPrt.sale_id = ? 
    ORDER BY saPrt.sale_id, saPrt.product_id;`,
    [id],
  );

  return sales;
};

module.exports = { createIdSales, createSales, getAllSales, getSalesId };