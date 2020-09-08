import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';
import addLocalStorageInfo from '../utils/addLocalStorageInfo';
import verifyLocalStorage from '../utils/verifyLocalStorage';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(() => {
    const { token } = verifyLocalStorage();

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return ({ token, auth: true });
    }

    return ({ token: '', auth: false });
  });

  const [user, setUser] = useState(() => {
    const { user } = verifyLocalStorage();

    return user || {};
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/user/login", {
      email,
      password
    })
      .catch(() => {
        throw new Error("Credenciais inválidas, corrija-as por gentileza e tente fazer login novamente.");
      });

    addLocalStorageInfo(response);

    const { token, auth, user } = response.data;
    api.defaults.headers.authorization = `Bearer ${token}`;

    setLoginData({ token, auth });
    setUser(user);
  }, [setLoginData]);

  const signOut = useCallback(() => {
    localStorage.clear();
    setLoginData({});
    setUser({});

    return;
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, loginData, user, setUser }}
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