const middleware = require("../verifyJWT");
const AppError = require("../../errors/AppError");

jest.mock("jsonwebtoken", () => {
  return ({
    verify: (token) => {
      return (token === "123") ? true : false;
    }
  });
});

const mockedNext = jest.fn();

describe("verifyJWT", () => {
  it("should verify the Json Web Token", () => {
    const mockedReq = {
      headers: {
        authorization: "Bearer 123"
      }
    };

    const response = middleware.verifyJWT(mockedReq, "", mockedNext);

    expect(response).toBe(true);
  });

  it("should not verify the Json Web Token when no authorization is send", () => {
    const mockedReq = {
      headers: {
        foo: "bar"
      }
    };

    middleware.verifyJWT(mockedReq, "", mockedNext);

    expect(mockedNext).toHaveBeenCalledWith(
      new AppError("No token provided!", 401)
    );
  });

  it("should not verify the Json Web Token when the authorization has more than 2 parts", () => {
    const mockedReq = {
      headers: {
        authorization: "lorem ipsum dolor sit amet"
      }
    };

    middleware.verifyJWT(mockedReq, "", mockedNext);

    expect(mockedNext).toHaveBeenCalledWith(
      new AppError("Token error", 401)
    );
  });

  it("should not verify the Json Web Token when the authorization doesnt has Bearer in the prefix", () => {
    const mockedReq = {
      headers: {
        authorization: "lorem ipsum"
      }
    };

    middleware.verifyJWT(mockedReq, "", mockedNext);

    expect(mockedNext).toHaveBeenCalledWith(
      new AppError("Token malformatted", 401)
    );
  });
});