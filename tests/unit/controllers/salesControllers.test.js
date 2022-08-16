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