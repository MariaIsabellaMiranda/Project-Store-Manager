const sinon = require("sinon");
const { expect } = require("chai");
const productsServices = require("../../../services/productsServices");
const productsControllers = require('../../../controllers/productsControllers');
const {
  ID,
  CODE_200,
  CODE_404,
  DATA_PRODUCT_ARRAY,
  DATA_PRODUCT_OBJECT,
  ERR_NOT_FOUND,
} = require("../utils/constants");

describe('Testa as funcionalidades do módulo que busca por todos os produtos e retorna os respectivos códigos e menssagens', () => {
  describe('Testa quando há produtos cadastrados', () => {
    const request = {};
    const response = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getAllProducts').resolves({
        code: CODE_200,
        data: DATA_PRODUCT_ARRAY,
      });
    })
    after(() => {
      productsServices.getAllProducts.restore();
    });

    it('se retorna o status com o código 200', async() => {
      await productsControllers.getAllProducts(request, response);

      expect(response.status.calledWith(CODE_200)).to.be.equal(true);
    });

    it('se retorna um json com os produtos cadastrados', async() => {
      await productsControllers.getAllProducts(request, response);

      expect(response.json.calledWith(DATA_PRODUCT_ARRAY)).to.be.equal(true)
    });
  });

  describe("Testa quando não há produtos cadastrados", () => {
    const request = {};
    const response = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, "getAllProducts").resolves({
        code: CODE_404,
        data: [],
      });
    });
    after(() => {
      productsServices.getAllProducts.restore();
    });
    it('se retorna um array vazio', async () => {
      await productsControllers.getAllProducts(request, response);

      expect(response.json.calledWith([])).to.be.equal(true);
    });

    it("se retorna o status com o código 404", async () => {
      await productsControllers.getAllProducts(request, response);

      expect(response.status.calledWith(CODE_404)).to.be.equal(true);
    });
  });
});

describe('Testa as funcionalidades do módulo que busca pelo produto de acordo com Id passado e retorna os respectivos códigos e menssagens', () => {
  describe('Testa quando encontra o produto conforme Id passado', () => {
    const request = {};
    const response = {};
    before(() => {
      request.params = { ID };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, "getProductById").resolves({
        code: CODE_200,
        data: DATA_PRODUCT_ARRAY,
      });
    });
    after(() => {
      productsServices.getProductById.restore();
    });

    it('se retorna o status com o código 200', async () => {
      await productsControllers.getProductById(request, response);

      expect(response.status.calledWith(CODE_200)).to.be.equal(true);
    });

    it('se retorna um json com o produto especificado no parâmetro', async () => {
      await productsControllers.getProductById(request, response);

      expect(response.json.calledWith(DATA_PRODUCT_OBJECT)).to.be.equal(true);
    });
  });

  describe('Testa quando o produto não é encontrado', () => {
    const request = {};
    const response = {};
    before(() => {
      request.params = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, "getProductById").resolves({
        code: CODE_404,
        message: 'Product not found',
      });
    });
    after(() => {
      productsServices.getProductById.restore();
    });
    it('se retorna um objeto com message e o erro', async () => {
      await productsControllers.getProductById(request, response);

      expect(response.json.calledWith(ERR_NOT_FOUND)).to.be.equal(true);
    });

    it('se retorna o status com o código 404', async () => {
      await productsControllers.getProductById(request, response);

      expect(response.status.calledWith(CODE_404)).to.be.equal(true);
    });
  });
});