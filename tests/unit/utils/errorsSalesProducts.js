const testsSalesError = [
  {
    invalidObject: { id: 3, quantity: 1 },
    invalidArray: [{ quantity: 1 }, { productId: 2, quantity: 5 }],
    code: 400,
    message: '"productId" is required',
  },
  {
    invalidObject: { id: 3, productId: 1 },
    invalidArray: [{ productId: 1, quantity: 1 }, { productId: 2 }],
    code: 400,
    message: '"quantity" is required',
  },
  {
    invalidObject: { id: 3, productId: 1, quantity: 0 },
    invalidArray: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 0 },
    ],
    code: 422,
    message: '"quantity" must be greater than or equal to 1',
  },
  {
    invalidObject: { id: 3, productId: 1, quantity: 1 },
    invalidArray: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
    ],
    code: 404,
    message: "Product not found",
  },
];

module.exports = { testsSalesError };