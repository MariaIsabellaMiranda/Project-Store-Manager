const sinon = require("sinon");
const { expect } = require("chai");
const salesServices = require('../../../services/salesServices');
const salesControllers = require('../../../controllers/salesControllers');
const {
  SALES_ARRAY,
  CODE_201,
  OBJECT_SALES_CREATED,
  SALES_PRODUCTID_INVALID,
  ERR_SALES_PRODUCTID_INVALID,
  CODE_400,
  DATA_GET_SALES_ALL,
  DATA_GET_SALES_ID,
  ERR_SALES_ID,
  CODE_404,
  CODE_200,
  CODE_204,
  ID,
  UPDATE_SALES,
} = require("../utils/constants");

describe('Testa as funcionalidades do controller que cadastra novas vendas', () => {
  describe('Testa quando é realizado o cadastro com sucesso', () => {
    const request = {};
    const response = {};
    before(() => {
      request.body = { SALES_ARRAY };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, "createSales").resolves({
        code: CODE_201,
        data: OBJECT_SALES_CREATED,
      });
    });

    after(() => {
      salesServices.createSales.restore();
    });

    it('se retorna um status com o código 200', async () => {
      await salesControllers.createSales(request, response);

      expect(response.status.calledWith(CODE_201)).to.be.equal(true);
    });

    it('se retorna um json com os dados vindos do service', async () => {
      await salesControllers.createSales(request, response);

      expect(response.json.calledWith(OBJECT_SALES_CREATED)).to.be.equal(true);
    });
  });

  describe("Testa quando não consegue cadastrar a venda e retorna um erro para o cliente", () => {
    const request = {};
    const response = {};
    before(() => {
      request.body = { SALES_PRODUCTID_INVALID };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, "createSales").resolves({
        code: CODE_400,
        message: '"productId" is required',
      });
    });

    after(() => {
      salesServices.createSales.restore();
    });

    it("se retorna um status com o código 400", async () => {
      await salesControllers.createSales(request, response);

      expect(response.status.calledWith(CODE_400)).to.be.equal(true);
    });

    it("se o json retorna uma menssagem com o erro", async () => {
      await salesControllers.createSales(request, response);

      expect(response.json.calledWith(ERR_SALES_PRODUCTID_INVALID))
      .to.be.equal(true);
    });
  });
});

describe("Testa as funcionalidades do controller que busca por todas as vendas e retorna os respectivos códigos e menssagens", () => {
  describe("Testa quando há vendas cadastradas", () => {
    const request = {};
    const response = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, "getAllSales").resolves({
        code: CODE_200,
        data: DATA_GET_SALES_ALL,
      });
    });
    after(() => {
      salesServices.getAllSales.restore();
    });

    it("se retorna o status com o código 200", async () => {
      await salesControllers.getAllSales(request, response);

      expect(response.status.calledWith(CODE_200)).to.be.equal(true);
    });

    it("se retorna um json com os produtos cadastrados", async () => {
      await salesControllers.getAllSales(request, response);

      expect(response.json.calledWith(DATA_GET_SALES_ALL)).to.be.equal(true);
    });
  });

  describe("Testa quando não há vendas cadastradas", () => {
    const request = {};
    const response = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, "getAllSales").resolves({
        code: CODE_404,
        data: [],
      });
    });
    after(() => {
      salesServices.getAllSales.restore();
    });
    it("se retorna um array vazio", async () => {
      await salesControllers.getAllSales(request, response);

      expect(response.json.calledWith([])).to.be.equal(true);
    });

    it("se retorna o status com o código 404", async () => {
      await salesControllers.getAllSales(request, response);

      expect(response.status.calledWith(CODE_404)).to.be.equal(true);
    });
  });
});

describe("Testa as funcionalidades do controller que busca as vendas de acordo com Id passado e retorna os respectivos códigos e menssagens", () => {
  describe("Testa quando encontra as vendas conforme Id passado", () => {
    const request = {};
    const response = {};
    before(() => {
      request.params = { ID };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, "getSalesId").resolves({
        code: CODE_200,
        data: DATA_GET_SALES_ID,
      });
    });
    after(() => {
      salesServices.getSalesId.restore();
    });

    it("se retorna o status com o código 200", async () => {
      await salesControllers.getSalesId(request, response);

      expect(response.status.calledWith(CODE_200)).to.be.equal(true);
    });

    it("se retorna um json com o produto especificado no parâmetro", async () => {
      await salesControllers.getSalesId(request, response);

      expect(response.json.calledWith(DATA_GET_SALES_ID)).to.be.equal(true);
    });
  });

  describe("Testa quando o produto não é encontrado", () => {
    const request = {};
    const response = {};
    before(() => {
      request.params = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, "getSalesId").resolves({
        code: CODE_404,
        message: "Sale not found",
      });
    });
    after(() => {
      salesServices.getSalesId.restore();
    });
    it("se retorna um objeto com message e o erro", async () => {
      await salesControllers.getSalesId(request, response);

      expect(response.json.calledWith(ERR_SALES_ID)).to.be.equal(true);
    });

    it("se retorna o status com o código 404", async () => {
      await salesControllers.getSalesId(request, response);

      expect(response.status.calledWith(CODE_404)).to.be.equal(true);
    });
  });
});

describe("Testa as funcionalidades do controller que deleta vendas", () => {
  describe("Testa quando consegue deletar uma venda com sucesso", () => {
    const request = {};
    const response = {};
    before(() => {
      request.params = { ID };
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();

      sinon.stub(salesServices, "deleteSales").resolves({
        code: CODE_204,
      });
    });

    after(() => {
      salesServices.deleteSales.restore();
    });

    it("se retorna um status com o código 204", async () => {
      await salesControllers.deleteSales(request, response);

      expect(response.status.calledWith(CODE_204)).to.be.equal(true);
    });

    it("se retorna um end encerrando", async () => {
      await salesControllers.deleteSales(request, response);

      expect(response.end.calledWith()).to.be.equal(true);
    });
  });
  describe("Testa quando não consegue deletar uma venda e retorna um erro para o cliente", () => {
    const request = {};
    const response = {};
    before(() => {
      request.params = { ID };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, "deleteSales").resolves({
        code: CODE_404,
        message: 'Sale not found',
      });
    });

    after(() => {
      salesServices.deleteSales.restore();
    });

    it("se retorna um status com o código 404", async () => {
      await salesControllers.deleteSales(request, response);

      expect(response.status.calledWith(CODE_404)).to.be.equal(true);
    });
    it('se o json retorna uma menssagem com o erro "Sale not found"', async () => {
      await salesControllers.deleteSales(request, response);

      expect(response.json.calledWith({message: 'Sale not found'})).to.be.equal(true);
    });
  });
});

describe("Testa as funcionalidades do controller que atualiza vendas", () => {
  describe("Testa quando consegue atualizar uma venda com sucesso", () => {
    const request = {};
    const response = {};
    before(() => {
      request.params = { ID };
      request.body = SALES_ARRAY;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, "updateSales").resolves({
        code: CODE_200,
        data: UPDATE_SALES,
      });
    });

    after(() => {
      salesServices.updateSales.restore();
    });

    it("se retorna um status com o código 200", async () => {
      await salesControllers.updateSales(request, response);

      expect(response.status.calledWith(CODE_200)).to.be.equal(true);
    });

    it("se retorna um json com os dados vindos do service", async () => {
      await salesControllers.updateSales(request, response);

      expect(response.json.calledWith(UPDATE_SALES)).to.be.equal(true);
    });
  });

  describe("Testa quando não consegue atualizar uma venda inexistente", () => {
    const request = {};
    const response = {};
    before(() => {
      request.params = { ID };
      request.body = SALES_ARRAY;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, "updateSales").resolves({
        code: CODE_404,
        message: "Sale not found",
      });
    });

    after(() => {
      salesServices.updateSales.restore();
    });

    it("se retorna um status com o código 404", async () => {
      await salesControllers.updateSales(request, response);

      expect(response.status.calledWith(CODE_404)).to.be.equal(true);
    });
    it('se o json retorna uma menssagem com o erro "Sale not found"', async () => {
      await salesControllers.updateSales(request, response);

      expect(
        response.json.calledWith({ message: "Sale not found" })
      ).to.be.equal(true);
    });
  });
});