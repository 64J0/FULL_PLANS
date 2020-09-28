import React, { createContext, useCallback, useState, useContext, useEffect } from "react";

import api from "../services/api";
import addLocalStorageInfo from "../utils/addLocalStorageInfo";
import verifyLocalStorage from "../utils/verifyLocalStorage";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(() => {
    const { token } = verifyLocalStorage();

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return ({ token, auth: true });
    }

    return ({ token: "", auth: false });
  });

  const [user, setUser] = useState(() => {
    const { user } = verifyLocalStorage();

    if (user && user._id) {
      return api.defaults.headers.user_id = user._id;
    }

    return user || {};
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/user/login", {
      email,
      password
    })
      .catch(() => {
        const message = "Credenciais inválidas, corrija-as por gentileza e tente fazer login novamente.";
        throw new Error(message);
      });

    addLocalStorageInfo(response);

    const { token, auth, user } = response.data;
    api.defaults.headers.authorization = `Bearer ${token}`;
    api.defaults.headers.user_id = user._id;

    setLoginData({ token, auth });
    return setUser(user);
  }, [setLoginData]);

  useEffect(() => {
    function adjustUserIdInHeaders() {
      if (user._id) {
        return api.defaults.headers.user_id = user._id;
      }
    }

    adjustUserIdInHeaders();
  }, [user]);

  const signOut = useCallback(() => {
    api.defaults.headers.authorization = "";
    api.defaults.headers.user_id = "";
    localStorage.clear();
    setLoginData({});
    return setUser({});
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, loginData, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };