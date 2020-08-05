import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';
import addLocalStorageInfo from '../utils/addLocalStorageInfo';
import verifyLocalStorage from '../utils/verifyLocalStorage';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(() => {
    const token = verifyLocalStorage();

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return ({ token, auth: true });
    }

    return ({ token: '', auth: false });
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/login", {
      email,
      senha: password
    });

    if (!response.data.auth) {
      throw new Error("Credenciais inválidas");
    }

    addLocalStorageInfo(response);

    const { token } = response.data;
    api.defaults.headers.authorization = `Bearer ${token}`;

    setLoginData(response.data);
  }, [setLoginData]);

  const signOut = useCallback(() => {
    localStorage.removeItem('@FullPlans:token');

    setLoginData({});
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, loginData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };