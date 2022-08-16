const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productsServices');
const productsModels = require('../../../models/productsModels');
const {
  ID,
  CODE_200,
  CODE_404,
  CODE_400,
  CODE_422,
  CODE_201,
  NAME_CREATE_PRODUCT,
  NAME_CHARACTERS_INSULFFICIENT,
  NAME_INVALID,
} = require("../utils/constants");

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
      sinon.stub(productsModels, 'getProductById').resolves(false);
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

describe('Testa as funcionalidade do módulo services de cadastramento de produto', () => {
  describe('Testa quando é possível cadastrar um produto com sucesso', () => {
    before(() => {
      sinon.stub(productsModels, 'createProduct')
        .resolves({ id: ID });
    });

    after(() => {
      productsModels.createProduct.restore();
    });

    it('se retorna um objeto', async () => {
      const result = await productsServices.createProduct(NAME_CREATE_PRODUCT);

      expect(result).to.be.a('object');
    });

    it('se no objeto retornado contêm as propriedades "code"e "data"', async () => {
      const result = await productsServices.createProduct(NAME_CREATE_PRODUCT);

      expect(result).to.have.keys("code", "data");
    });

    it('se a propriedade code contêm o satus "201"', async () => {
      const result = await productsServices.createProduct(NAME_CREATE_PRODUCT);

      expect(result.code).to.be.equal(CODE_201);
    });

    it('se a propriedade data contêm um objeto', async () => {
      const result = await productsServices.createProduct(NAME_CREATE_PRODUCT);

      expect(result.data).to.be.a('object');
    });

    it('se o objeto da propriedade data contêm outro objeto com as propriedades "id" e "name"', async () => {
      const result = await productsServices.createProduct(NAME_CREATE_PRODUCT);

      expect(result.data).to.have.keys('id', 'name');
    })
  });

  describe("Testa quando não é possível cadastrar um produto por caracteres insuficientes", () => {
    before(() => {
      sinon.stub(productsModels, 'createProduct')
        .resolves({ id: ID });
    });

    after(() => {
      productsModels.createProduct.restore();
    });

    it('se retorna um objeto', async () => {
      const result = await productsServices.createProduct(NAME_CHARACTERS_INSULFFICIENT);

      expect(result).to.be.a('object');
    });

    it('se no objeto contêm as propriedades "code" e "message"', async () => {
      const result = await productsServices.createProduct(NAME_CHARACTERS_INSULFFICIENT);

      expect(result).to.have.keys('code', 'message');
    });

    it('se a propriedade code contêm o satus "422"', async () => {
      const result = await productsServices.createProduct(NAME_CHARACTERS_INSULFFICIENT);

       expect(result.code).to.be.equal(CODE_422);
    });

    it('se a propriedade message contêm uma string', async () => {
      const result = await productsServices.createProduct(NAME_CHARACTERS_INSULFFICIENT);

      expect(result.message).to.be.a('string');
    });

    it('se a propriedade message contêm a seguinte menssagem: "name" length must be at least 5 characters long"', async () => {
      const result = await productsServices.createProduct(NAME_CHARACTERS_INSULFFICIENT);

      expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });

  describe("Testa quando não é possível cadastrar um produto por não ter o campo name", () => {
  before(() => {
      sinon.stub(productsModels, 'createProduct')
        .resolves({ id: ID });
    });

    after(() => {
      productsModels.createProduct.restore();
    });

  it("se retorna um objeto", async () => {
    const result = await productsServices.createProduct(NAME_INVALID);

    expect(result).to.be.a('object');
  });
  it('se no objeto contêm as propriedades "code" e "message"', async () => {
    const result = await productsServices.createProduct(NAME_INVALID);

    expect(result).to.have.keys('code', 'message');
  });
  it('se a propriedade code contêm o satus "400"', async () => {
    const result = await productsServices.createProduct(NAME_INVALID);

    expect(result.code).to.be.equal(CODE_400);
  });
  it("se a propriedade message contêm uma string", async () => {
    const result = await productsServices.createProduct(NAME_INVALID);

    expect(result.message).to.be.a('string');
  });
  it('se a propriedade message contêm a seguinte menssagem: "name" is required"', async () => {
    const result = await productsServices.createProduct(NAME_INVALID);

    expect(result.message).to.be.equal('"name" is required');
  });
});
});