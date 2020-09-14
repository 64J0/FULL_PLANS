const verifyAdmin = require("../verifyAdmin");
const AppError = require("../../errors/AppError");

jest.mock("../../repositories/users-repository");

const mockedRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockedNext = jest.fn();

describe("verifyAdmin middleware", () => {
  it("should call next() function without nothing in the params when the user has admin permission", async () => {
    const req = {
      body: {
        adminId: "3"
      }
    };

    await verifyAdmin(req, mockedRes, mockedNext);

    expect(mockedNext).toHaveBeenCalledWith();
  });

  it("should return an error if the user doesn't has permission of admin", async () => {
    const req = {
      body: {
        adminId: "2"
      }
    };

    await verifyAdmin(req, mockedRes, mockedNext);

    expect(mockedNext)
      .toHaveBeenCalledWith(
        new AppError(
          "Usuário não autorizado a fazer essa ação!",
          401
        )
      );
  });

  it("should throw an error if undefined ID is provided", async () => {
    const req = {
      body: {
        adminId: ""
      }
    };

    await verifyAdmin(req, mockedRes, mockedNext);

    expect(mockedNext)
      .toHaveBeenCalledWith(
        new AppError(
          "O ID do admin não foi informado!",
          401
        )
      );
  });

  it("should throw an error if an ID that isnt in the database is given", async () => {
    const req = {
      body: {
        adminId: "4"
      }
    };

    await verifyAdmin(req, mockedRes, mockedNext);

    expect(mockedNext)
      .toHaveBeenCalledWith(
        new AppError(
          "Usuário admin não encontrado!",
          401
        )
      );
  });

  it("should throw an error if no ID is provided", async () => {
    const req = {
      body: {
        foo: "bar"
      }
    };

    await verifyAdmin(req, mockedRes, mockedNext);

    expect(mockedNext)
      .toHaveBeenCalledWith(
        new AppError(
          "O ID do admin não foi informado!",
          401
        )
      );
  });
});