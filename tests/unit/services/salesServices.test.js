const sinon = require("sinon");
const { expect } = require("chai");
const salesModels = require('../../../models/salesModels');
const salesServices = require('../../../services/salesServices');
const salesValidation = require('../../../utils/salesValidation');
const testsError = require('../utils/errorsSalesProducts');
const {
  ID,
  SALES_ARRAY,
  SALES_PRODUCTS,
  CODE_201,
  DATA_GET_SALES_ALL,
  DATA_GET_SALES_ID,
  CODE_200,
  CODE_404,
} = require("../utils/constants");

describe('Testa as funcionalidades do módulo da pasta service que efetua o cadastramento das vendas', () => {
  describe('Testa quando cadastra uma venda com sucesso', () => {
    before(() => {
      sinon.stub(salesModels, "createIdSales").resolves({ id: ID });
      sinon.stub(salesModels, "createSales").resolves(SALES_PRODUCTS);
    });

    after(() => {
      salesModels.createIdSales.restore();
      salesModels.createSales.restore();
    });

    it("se retorna um objeto", async () => {
      const result = await salesServices.createSales(SALES_ARRAY);

      expect(result).to.be.a("object");
    });

    it('se no objeto retornado contêm as propriedades "code"e "data"', async () => {
      const result = await salesServices.createSales(SALES_ARRAY);

      expect(result).to.have.keys("code", "data");
    });

    it('se a propriedade code contêm o satus "201"', async () => {
      const result = await salesServices.createSales(SALES_ARRAY);

      expect(result.code).to.be.equal(CODE_201);
    });

    it("se a propriedade data contêm um objeto", async () => {
      const result = await salesServices.createSales(SALES_ARRAY);

      expect(result.data).to.be.a("object");
    });

    it('se o objeto da propriedade data contêm outro objeto com as propriedades "id" e "itemsSold"', async () => {
      const result = await salesServices.createSales(SALES_ARRAY);

      expect(result.data).to.have.keys("id", "itemsSold");
    });

    it('se a propriedade "itemsSold" contêm um array', async () => {
      const result = await salesServices.createSales(SALES_ARRAY);

      expect(result.data.itemsSold).to.be.a('array');
    });
  });

  testsError.testsSalesError.forEach((dataErrors) => {
    describe("Testa quando a requisição não passa em alguma validação e retorna um erro", () => {
      before(() => {
        sinon.stub(salesValidation, "checkProductId").resolves([[], false]);
        sinon.stub(salesModels, "createIdSales").resolves({ id: ID });
        sinon
          .stub(salesModels, "createSales")
          .resolves(dataErrors.invalidObject);
      });

      after(() => {
        salesValidation.checkProductId.restore();
        salesModels.createIdSales.restore();
        salesModels.createSales.restore();
      });

      it("se retorna um objeto", async () => {
        const result = await salesServices.createSales(dataErrors.invalidArray);

        expect(result).to.be.a("object");
      });

      it('se no objeto contêm as propriedades "code" e "message"', async () => {
        const result = await salesServices.createSales(dataErrors.invalidArray);

        expect(result).to.have.keys("code", "message");
      });

      it("se a propriedade code contêm o satus correto", async () => {
        const result = await salesServices.createSales(dataErrors.invalidArray);
        expect(result.code).to.be.equal(dataErrors.code);
      });

      it("se a propriedade message contêm uma string", async () => {
        const result = await salesServices.createSales(dataErrors.invalidArray);

        expect(result.message).to.be.a("string");
      });

      it("se a propriedade message contêm a menssagem correta", async () => {
        const result = await salesServices.createSales(dataErrors.invalidArray);

        expect(result.message).to.be.equal(dataErrors.message);
      });
    });
  });
});

describe("Testa as funcionalidades do módulo da pasta service que lista todas as vendas", () => {
  describe("Testa quando o retorno é bem sucessido", () => {
    before(() => {
      sinon.stub(salesModels, "getAllSales").resolves(DATA_GET_SALES_ALL);
    });

    after(() => {
      salesModels.getAllSales.restore();
    });

    it("se retorna um objeto", async () => {
      const result = await salesServices.getAllSales();
      expect(result).to.be.a("object");
    });
    it('se os objetos tem as propriedades: "code" e "data"', async () => {
      const result = await salesServices.getAllSales();
      expect(result).to.have.keys("code", "data");
    });
    it('se a propriedade code tem o valor "200"', async () => {
      const result = await salesServices.getAllSales();
      expect(result.code).to.be.equal(CODE_200);
    });
    it("se a propriedade data é um array", async () => {
      const result = await salesServices.getAllSales();
      expect(result.data).to.be.a("array");
    });
    it("se a propriedade data tem um objeto com as propriedades saleId, date, productId, e quantity", async () => {
      const result = await salesServices.getAllSales();

      expect(result.data[0]).to.have.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
  describe("Testa quando não há nenhuma venda cadastrada", () => {
    before(() => {
      sinon.stub(salesModels, "getAllSales").resolves([]);
    });

    after(() => {
      salesModels.getAllSales.restore();
    });

    it("se retorna um objeto", async () => {
      const result = await salesServices.getAllSales();
      expect(result).to.be.a("object");
    });

    it('se o objeto tem as propriedades: "code" e "data"', async () => {
      const result = await salesServices.getAllSales();
      expect(result).to.have.keys("code", "data");
    });
    it('se a propriedade code tem o valor "200"', async () => {
      const result = await salesServices.getAllSales();
      expect(result.code).to.be.equal(CODE_200);
    });
    it("se a propriedade data contém um array vazio", async () => {
      const result = await salesServices.getAllSales();
      expect(result.data).to.be.empty;
    });
  });
});

describe('Testa a funcionalidade do módulo da camada services que busca as vendas de acordo com o "ID" passado', () => {
  describe("Testa quando retorna a venda conforme o Id passado", () => {
    before(() => {
      sinon.stub(salesModels, "getSalesId").resolves(DATA_GET_SALES_ID);
    });

    after(() => {
      salesModels.getSalesId.restore();
    });

    it("se retorna um objeto", async () => {
      const result = await salesServices.getSalesId(ID);
      expect(result).to.be.a("object");
    });
    it('se os objetos tem as propriedades: "code" e "data"', async () => {
      const result = await salesServices.getSalesId(ID);
      expect(result).to.have.keys("code", "data");
    });
    it('se a propriedade code tem o valor "200"', async () => {
      const result = await salesServices.getSalesId(ID);
      expect(result.code).to.be.equal(CODE_200);
    });
    it("se a propriedade data tem um objeto com as propriedades 'date', 'productId' e 'quantity'", async () => {
      const result = await salesServices.getSalesId(ID);
      expect(result.data[0]).to.have.keys("date", "productId", "quantity");
    });
  });

  describe("Testa quando não existe vendas conforme Id passado", () => {
    before(() => {
      sinon.stub(salesModels, "getSalesId").resolves(false);
    });

    after(() => {
      salesModels.getSalesId.restore();
    });

    it("se retorna um objeto", async () => {
      const result = await salesServices.getSalesId(ID);
      expect(result).to.be.a("object");
    });

    it('se o objeto tem as propriedades: "code" e "message"', async () => {
      const result = await salesServices.getSalesId(ID);
      expect(result).to.have.keys("code", "message");
    });

    it('se a propriedade code tem o valor "404"', async () => {
      const result = await salesServices.getSalesId(ID);
      expect(result.code).to.be.equal(CODE_404);
    });

    it("se a propriedade message tem escrito a frase esperada", async () => {
      const result = await salesServices.getSalesId(ID);
      expect(result.message).to.be.equal("Sale not found");
    });
  });
});