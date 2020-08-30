const bcrypt = require("bcryptjs");
const AuthenticateUserService = require("./AuthenticateUserService");

jest.mock("../../repositories/users-repository");
jest.mock("bcryptjs", () => {
  const compare = async (password, userPassword) => {
    return (
      new Promise((resolve) => {
        resolve(password === userPassword ? 1 : 0);
      }
      ));
  }

  return {
    compare
  }
});

jest.mock("jsonwebtoken", () => {
  const sign = () => {
    return "token-test";
  }

  return {
    sign
  }
})

describe("AuthenticateUserService", () => {
  it("should authenticate", async () => {
    const result = await AuthenticateUserService.execute({
      email: "teste1@teste.com",
      password: "123456"
    });

    expect(result).toHaveProperty("auth");
    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("user");
    expect(result.user).toHaveProperty("_id", "1");
    expect(result.user).toHaveProperty("password", undefined);
  });

  it("should not authenticate when it's used a non-existent e-mail in the database", async () => {
    const result = await AuthenticateUserService.execute({
      email: "non-existent@email.com",
      password: "123456"
    });

    const spyOnBcrypt_Compare = jest.spyOn(bcrypt, "compare");

    expect(spyOnBcrypt_Compare).not.toHaveBeenCalled();
    expect(result).toHaveProperty("auth", false);
  });

  it("should not authenticate when it's send a wrong password", async () => {
    const result = await AuthenticateUserService.execute({
      email: "teste1@teste.com",
      password: "123"
    });

    const spyOnBcrypt_Compare = jest.spyOn(bcrypt, "compare");

    expect(spyOnBcrypt_Compare).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty("auth", false);
  });
});