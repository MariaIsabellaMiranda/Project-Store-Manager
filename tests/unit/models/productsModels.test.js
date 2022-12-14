const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModels = require('../../../models/productsModels');
const { ID, OBJECT_NAME_PRODUCT } = require("../utils/constants");


describe('Testa as funcionalidades dos módulos da camada models que listam todos os produtos', () => {
  describe('Testa quando a busca pela lista completa é bem sucedida', () => {
    before(async () => {
      const result = [[{ id: 2, name: 'Traje de encolhimento' }], []];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('se retorna um array', async () => {
      const result = await productsModels.getAllProducts();
      expect(result).to.be.a('array');
    });
    it('se o array possui um objeto dentro', async () => {
      const result = await productsModels.getAllProducts();
      expect(result[0]).to.be.a('object');
    });
    it('se os objetos tem as propriedades: "id" e "name"', async () => {
      const result = await productsModels.getAllProducts();
      expect(result[0]).to.include.all.keys('id', 'name');
    });
  });

  describe('Testa quando não existe nenhum produto no DB', () => {
    before(async () => {
      const result = [[], []];
      sinon.stub(connection, "execute").resolves(result);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('se retorna um array', async () => {
      const result = await productsModels.getAllProducts();
      expect(result).to.be.a('array');
    });

    it('se o array está vazio', async () => {
      const result = await productsModels.getAllProducts();
      expect(result).to.be.empty;
    });
  });
});

describe('Testa as funcionalidades do módulo da camada models que busca um produto pelo Id', () => {
  describe('Testa quando a busca no DB através do id é bem sucedida', () => {
    before(async () => {
      const result = [[{ id: 2, name: 'Traje de encolhimento' }], []];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('se retorna um array', async () => {
      const result = await productsModels.getProductById(ID);
      expect(result).to.be.a('array');
    });
    it('se o array possui um objeto dentro', async () => {
      const result = await productsModels.getProductById(ID);
      expect(result[0]).to.be.a("object");
    });
    it('se os objetos tem as propriedades: "id" e "name"', async () => {
      const result = await productsModels.getProductById(ID);
      const item = result[0];
      expect(item).to.include.all.keys("id", "name");
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

    it('se retorna um booleano false', async () => {
      const result = await productsModels.getProductById(ID);
      expect(result).to.be.false;
    });
  });
});

describe('Testa as funcionalidades dos módulos da camada models de cadastramento de um produto', () => {
  const product = 'ProdutoX';
  describe('Testa quando é possível cadastrar um produto com sucesso', () => {
    before(async () => {
      const insertId = [{ insertId: 4 }];
      sinon.stub(connection, 'execute').resolves(insertId);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('se retorna um objeto', async () => {
      const result = await productsModels.createProduct(product);

      expect(result).to.be.a('object');
    });
    it('se o objeto contêm a propriedade "id"', async () => {
      const result = await productsModels.createProduct(product);

      expect(result).to.have.a.property('id');
    });
  });
});

describe('Testa as funcionaliddes do módulo da camada models, onde é possível atualizar um produto', () => {
  describe('Testa quando é possível atualizar um produto', () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves();
    });

    after(async () => {
      connection.execute.restore();
    });

    it("se retorna um objeto", async () => {
      const result = await productsModels.updateProductById(ID, OBJECT_NAME_PRODUCT);

      expect(result).to.be.a("object");
    });
    it('se o objeto contêm as propriedades "id" e name', async () => {
      const result = await productsModels.updateProductById(ID, OBJECT_NAME_PRODUCT);

      expect(result).to.have.a.property("id");
    });
  });
});

describe("Testa as funcionaliddes do módulo da camada models, onde é possível deletar um produto", () => {
  describe("Testa quando é possível deletar um produto com sucesso", () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves();
    });

    after(async () => {
      connection.execute.restore();
    });

    it("se retorna uma string", async () => {
      const result = await productsModels.deleteProducts(ID);

      expect(result).to.be.a("string");
    });
    it('se a string contêm a menssagem "Ok"', async () => {
      const result = await productsModels.deleteProducts(ID);

      expect(result).to.equal('Ok');
    });
  });
});