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
