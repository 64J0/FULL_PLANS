// Teste da rota '/' -> index-routes.js
// Esse teste é utilizado para verificar a rota vazia da aplicação.
const request = require("supertest");

const app = require("../../src/app");
const packageJson = require("../../package.json");

describe('index route "/"', () => {
  it("should return a json with determined data", async () => {
    // Faz uma requisição GET à rota '/' da API
    const response = await request(app).get("/");

    expect(response.body.title).toBe("FULL Plans API");
    expect(response.body.version).toEqual(packageJson.version);
  });
});
