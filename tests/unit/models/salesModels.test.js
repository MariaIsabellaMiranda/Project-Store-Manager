const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const salesModels = require('../../../models/salesModels');
const {
  SALES_PRODUCTS,
  GET_SALES_ALL,
  GET_SALES_ID,
  ID,
} = require("../utils/constants.js");

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

  it('se o objeto contêm as propriedades "productId", "quantity"', async () => {
    const result = await salesModels.createSales(SALES_PRODUCTS);

    expect(result).to.include.all.keys('productId', 'quantity');
  });
});

describe("Testa as funcionalidades dos módulos da camada models que listam todas as vendas", () => {
  describe("Testa quando a busca pela lista completa é bem sucedida", () => {
    before(async () => {
      const result = GET_SALES_ALL;
      sinon.stub(connection, "execute").resolves(result);
    });
    after(async () => {
      connection.execute.restore();
    });

    it("se retorna um array", async () => {
      const result = await salesModels.getAllSales();
      expect(result).to.be.a("array");
    });
    it("se o array possui um objeto dentro", async () => {
      const result = await salesModels.getAllSales();
      expect(result[0]).to.be.a("object");
    });
    it('se os objetos tem as propriedades: "saleId", "date", "productId" e "quantity"', async () => {
      const result = await salesModels.getAllSales();
      expect(result[0]).to.include.all.keys(
        "saleId",
        "date",
        "productId",
        "quantity"
      );
    });
  });

  describe("Testa quando não existe nenhuma venda no DB", () => {
    before(async () => {
      const result = [[], []];
      sinon.stub(connection, "execute").resolves(result);
    });
    after(async () => {
      connection.execute.restore();
    });

    it("se retorna um array", async () => {
      const result = await salesModels.getAllSales();
      expect(result).to.be.a("array");
    });

    it("se o array está vazio", async () => {
      const result = await salesModels.getAllSales();
      expect(result).to.be.empty;
    });
  });

  describe('Testa as funcionalidades do módulo da camada models que busca vendas pelo Id', () => {
  describe('Testa quando a busca no DB através do id é bem sucedida', () => {
    before(async () => {
      const result = [GET_SALES_ID];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(async () => {
      connection.execute.restore();
    });

    it("se retorna um array", async () => {
      const result = await salesModels.getSalesId(ID);
      expect(result).to.be.a("array");
    });

    it("se o array possui um objeto dentro", async () => {
      const result = await salesModels.getSalesId(ID);
      expect(result[0]).to.be.a("object");
    });

    it('se os objetos tem as propriedades: "date", "productId" e "quantity"', async () => {
      const result = await salesModels.getSalesId(ID);
      const item = result[0];
      expect(item).to.include.all.keys("date", "productId", "quantity");
    });
  });

  describe('Testa quando o id passado não corresponde a nenhum produto', () => {
    before(async () => {
      const result = [[], []];
      sinon.stub(connection, "execute").resolves(result);
    });
    after(async () => {
      connection.execute.restore();
    });

    it("se retorna um array", async () => {
      const result = await salesModels.getSalesId();
      expect(result).to.be.a("array");
    });

    it("se o array está vazio", async () => {
      const result = await salesModels.getSalesId();
      expect(result).to.be.empty;
    });
  });
});
});