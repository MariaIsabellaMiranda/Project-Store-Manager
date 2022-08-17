module.exports = {
  ID: 2,
  CODE_200: 200,
  CODE_404: 404,
  CODE_400: 400,
  CODE_422: 422,
  CODE_201: 201,
  DATA_PRODUCT_ARRAY: [{ id: 2, name: "Traje de encolhimento" }],
  DATA_PRODUCT_OBJECT: { id: 2, name: "Traje de encolhimento" },
  ERR_NOT_FOUND: { message: "Product not found" },
  NAME_CREATE_PRODUCT: "ProdutoX",
  OBJECT_NAME_CREATE_PRODUCT: { name: "ProdutoX" },
  OBJECT_CREATED: { id: 2, name: "ProdutoX" },
  NAME_CHARACTERS_INSULFFICIENT: "Pro",
  NAME_INVALID: "",
  ERR_NAME_INVALID: { message: '"name" is required' },
  SALES_ARRAY: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
  SALES_PRODUCTS: { id: 3, productId: 1, quantity: 1 },
  OBJECT_SALES_CREATED: {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
  SALES_PRODUCTID_INVALID: [{ quantity: 1 }, { productId: 2, quantity: 5 }],
  ERR_SALES_PRODUCTID_INVALID: { message: '"productId" is required' },
  GET_SALES_ALL: [
    [
      {
        sale_Id: 1,
        date: "2021-09-09T04:54:29.000Z",
        product_Id: 1,
        quantity: 2,
      },
    ],
    [],
  ],
  GET_SALES_ID: [
    [
      {
        date: "2021-09-09T04:54:29.000Z",
        product_Id: 1,
        quantity: 2,
      },
    ],
    [],
  ],
  DATA_GET_SALES_ALL: [
    {
      saleId: 1,
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2,
    },
  ],
  DATA_GET_SALES_ID: [
    {
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2,
    },
  ],
  ERR_SALES_ALL: { message: "Sale not found" },
};