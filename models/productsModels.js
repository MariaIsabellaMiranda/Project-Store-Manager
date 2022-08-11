const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    `SELECT id, name FROM StoreManager.products
      ORDER BY id;`,
  );

  return products;
};

const getProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT id, name FROM StoreManager.products WHERE id = ?;', [id],
);

  return product;
};

module.exports = { getAllProducts, getProductById };