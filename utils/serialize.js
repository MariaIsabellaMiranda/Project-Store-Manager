const serialize = (salesAll) =>
  salesAll.map((sales) => ({
    saleId: sales.sale_id,
    date: sales.date,
    productId: sales.product_id,
    quantity: sales.quantity,
  }));

  module.exports = serialize;
