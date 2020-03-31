// Teste da rota '/login' -> login-routes.js
// Esse teste é utilizado para verificar a rota de login da aplicação.
const request = require("supertest");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = require("../../src/app");

describe('login route "/login"', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_TEST_CONNECTION_STRING, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return a json with auth and token", async () => {
    // Faz uma requisição POST à rota '/login' da API
    const response = await request(app).post("/login").send({
      email: "teste",
      senha: "teste"
    });

    expect(response.body).toHaveProperty("auth");
    expect(response.body.auth).toBe(true);
    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toBeDefined();
    expect(response.body.token).not.toBeNull();
  });
});
