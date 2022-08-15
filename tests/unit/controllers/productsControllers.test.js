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
  CODE_400,
  CODE_201,
  NAME_INVALID,
  OBJECT_NAME_CREATE_PRODUCT,
  OBJECT_CREATED,
  ERR_NAME_INVALID,
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

describe('Testa as funcionalidades do módulo de controller que cadastra produtos', () => {
  describe('Testa quando consegue cadastrar o produto com sucesso', () => {
    const request = {};
    const response = {};
    before(() => {
      request.body = { OBJECT_NAME_CREATE_PRODUCT };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, "createProduct").resolves({
        code: CODE_201,
        data: OBJECT_CREATED,
      });
    });

    after(() => {
      productsServices.createProduct.restore();
    });

    it('se retorna um status com o código 200', async () => {
      await productsControllers.createProduct(request, response);

      expect(response.status.calledWith(CODE_201)).to.be.equal(true);
    });

    it('se retorna um json com os dados vindos do service', async () => {
      await productsControllers.createProduct(request, response);

      expect(response.json.calledWith(OBJECT_CREATED)).to.be.equal(true);
    });
  });

  describe("Testa qaundo não consegue cadastrar o produto e retorna um erro para o cliente", () => {
    const request = {};
    const response = {};
    before(() => {
      request.body = { NAME_INVALID };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, "createProduct").resolves({
        code: CODE_400,
        message: '"name" is required',
      });
    });

    after(() => {
      productsServices.createProduct.restore();
    });

    it('se retorna um status com o código 404', async () => {
      await productsControllers.createProduct(request, response);

      expect(response.status.calledWith(CODE_400)).to.be.equal(true);
    });
    it('se o json retorna uma menssagem com o erro', async () => {
       await productsControllers.createProduct(request, response);

      expect(response.json.calledWith(ERR_NAME_INVALID)).to.be.equal(true);
    });
  });
});