let UserDataBase = [
  {
    _id: "1",
    name: "Nome Teste 1",
    email: "teste1@teste.com",
    password: "123456",
    permission: "read",
    createdAt: Date.now()
  },
  {
    _id: "2",
    name: "Nome Teste 2",
    email: "teste2@teste.com",
    password: "123456",
    permission: "write",
    createdAt: Date.now()
  },
  {
    _id: "3",
    name: "Nome Teste 3",
    email: "teste3@teste.com",
    password: "123456",
    permission: "admin",
    createdAt: Date.now()
  }
];

exports.findByEmail = async ({ email }) => {
  try {
    const user = UserDataBase.find((thisUser) => thisUser.email === email);

    if (!user.name) {
      throw new Error("Usuário não foi encontrado!");
    }

    return user;
  } catch {
    return undefined;
  }
}

exports.findById = async ({ id }) => {
  try {
    const user = UserDataBase.find((thisUser) => thisUser._id === id);

    if (!user) {
      throw new Error("Usuário não foi encontrado!");
    }

    return user;
  } catch (err) {
    return { message: err };
  }
}

exports.create = async ({ name, email, password, permission }) => {
  const user = { name, email, password, permission };

  const newId = Number(UserDataBase[UserDataBase.length - 1]._id) + 1;
  Object.assign(user, { _id: newId });

  UserDataBase.push(user);

  user.password = undefined;
  return user;
}

exports.update = async (id, data) => {
  const updatedData = { ...data };
  const updatedUser = UserDataBase.find(thisUser => thisUser._id === id);

  Object.assign(updatedUser, updatedData);

  updatedUser.password = undefined;
  return updatedUser;
}

exports.list = async () => {
  return UserDataBase;
};

exports.delete = async (id) => {
  UserDataBase = UserDataBase.filter((thisUser) => thisUser._id !== id);

  return UserDataBase;
}
