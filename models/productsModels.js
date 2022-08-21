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
  
  if (!product.length) return false;

  return product;
};

const createProduct = async (name) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [name],
  );

  return { id: product.insertId };
};

const updateProductById = async (id, name) => {
  await connection.execute(
    `UPDATE StoreManager.products SET name = ?
    WHERE id = ?;`,
    [name, id],
  );

  return { id, name };
};

const deleteProducts = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;', [id],
  );

  return 'Ok';
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProducts,
};