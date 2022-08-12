const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productsServices');
const productsModels = require('../../../models/productsModels');
const { ID, CODE_200, CODE_404 } = require('../utils/constants');

describe('Testa as funcionalidades do módulo da pasta service que lista todos os produtos', () => {
  describe("Testa quando o retorno é bem sucessido", () => {
    before(() => {
      sinon
        .stub(productsModels, "getAllProducts")
        .resolves([{ id: 2, name: "Traje de encolhimento" }]);
    });

    after(() => {
      productsModels.getAllProducts.restore();
    });
    it('se retorna um objeto', async () => {
      const result = await productsServices.getAllProducts();
      expect(result).to.be.a('object');
    });
    it('se os objetos tem as propriedades: "code" e "data"', async () => {
      const result = await productsServices.getAllProducts();
      expect(result).to.have.keys('code', 'data');
    });
    it('se a propriedade code tem o valor "200"', async () => {
      const result = await productsServices.getAllProducts();
      expect(result.code).to.be.equal(CODE_200);
    });
    it("se a propriedade data é um array", async () => {
      const result = await productsServices.getAllProducts();
      expect(result.data).to.be.a('array');
    });
    it('se a propriedade data tem um objeto com as propriedades id e name', async () => {
      const result = await productsServices.getAllProducts();

      expect(result.data[0]).to.have.keys('id', 'name');
    });
  });
  describe('Testa quando não há nenhum produto cadastrado', () => {
    before(() => {
      sinon
        .stub(productsModels, "getAllProducts")
        .resolves([]);
    });

    after(() => {
      productsModels.getAllProducts.restore();
    });

    it('se retorna um objeto', async () => {
      const result = await productsServices.getAllProducts();
      expect(result).to.be.a('object');
    });

    it('se o objeto tem as propriedades: "code" e "data"', async () => {
      const result = await productsServices.getAllProducts();
      expect(result).to.have.keys('code', 'data');
    });
    it('se a propriedade code tem o valor "200"', async () => {
      const result = await productsServices.getAllProducts();
      expect(result.code).to.be.equal(CODE_200);
    });
    it("se a propriedade data contém um array vazio", async () => {
      const result = await productsServices.getAllProducts();
      expect(result.data).to.be.empty;
    });
  });
});

describe('Testa a funcionalidade do módulo que busca o produto de acordo com o "ID" passado', () => {
  describe("Testa quando retorna o produto conforme o Id passado", () => {
    before(() => {
      sinon
        .stub(productsModels, "getProductById")
        .resolves([{ id: 2, name: "Traje de encolhimento" }]);
    });

    after(() => {
      productsModels.getProductById.restore();
    });

    it("se retorna um objeto", async () => {
      const result = await productsServices.getProductById(ID);
      expect(result).to.be.a('object');
    });
    it('se os objetos tem as propriedades: "code" e "data"', async () => {
      const result = await productsServices.getProductById(ID);
      expect(result).to.have.keys('code', 'data');
    });
    it('se a propriedade code tem o valor "200"', async () => {
      const result = await productsServices.getProductById(ID);
      expect(result.code).to.be.equal(CODE_200);
    });
    it("se a propriedade data tem um objeto com as propriedades id e name", async () => {
      const result = await productsServices.getProductById(ID);
      expect(result.data[0]).to.have.keys('id', 'name');
    });
  });

  describe('Testa quando não existe o produto conforme Id passado', () => {
    before(() => {
      sinon.stub(productsModels, 'getProductById').resolves([]);
    });

    after(() => {
      productsModels.getProductById.restore();
    });

    it("se retorna um objeto", async () => {
      const result = await productsServices.getProductById(ID);
      expect(result).to.be.a('object');
    });

    it('se o objeto tem as propriedades: "code" e "message"', async () => {
      const result = await productsServices.getProductById(ID);
      expect(result).to.have.keys('code', 'message');
    });

    it('se a propriedade code tem o valor "404"', async () => {
      const result = await productsServices.getProductById(ID);
      expect(result.code).to.be.equal(CODE_404);
    });

    it('se a propriedade message tem escrito a frase esperada', async () => {
      const result = await productsServices.getProductById(ID);
      expect(result.message).to.be.equal('Product not found');
    });
  });
});