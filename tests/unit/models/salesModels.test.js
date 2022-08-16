const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const salesModels = require('../../../models/salesModels');
const { SALES_PRODUCTS } = require("../utils/constants.js");

describe('Testa as funcionalidades dos módulos que cadastram novas vendas', () => {
  describe('Testa quando é possível cadastrar uma venda na tabela sales que retorna um Id da venda', () => {
    before(async () => {
      const result = [{insertId: 3}];
      sinon.stub(connection, "execute").resolves(result);
    });

    after(async () => {
      connection.execute.restore();
    });
  });

  it('se retorna um objeto', async () => {
    const result = await salesModels.createIdSales();

    expect(result).to.be.a('object');
  });
  it('se o objeto contêm a propriedade "id"', async () => {
    const result = await salesModels.createIdSales();

    expect(result).to.have.a.property('id');
  });

  describe('Testa quando é possível cadastrar uma venda na tabela sales_products', () => {
    before(async () => {
      const result = [{ insertId: 3 }];
      sinon.stub(connection, "execute").resolves(result);
    });

    after(async () => {
      connection.execute.restore();
    });
  });

  it('se retorna um objeto', async () => {
    const result = await salesModels.createSales(SALES_PRODUCTS);

    expect(result).to.be.a('object');
  });

  it('se o objeto contêm as propriedades "productId", "quantity" e "id"', async () => {
    const result = await salesModels.createSales(SALES_PRODUCTS);

    expect(result).to.include.all.keys('productId', 'quantity', 'id');
  });
});
