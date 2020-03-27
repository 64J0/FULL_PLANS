function verifyLocalStorage() {
  // Verifica se existe o item 'authJWT' no localStorage
  const token = localStorage.getItem('authJWT');
  if (token) {
      let expirationDate = localStorage.getItem('expiresIn');
      if (Number(Date.now()) > Number(expirationDate)) {
        localStorage.removeItem('authJWT');
        localStorage.removeItem('expiresIn');
        return false;
      } else {
        return token;
      }
  } else {
    return false;
  }
}

export default verifyLocalStorage;