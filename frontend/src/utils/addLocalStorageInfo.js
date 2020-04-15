// addLocalStorageInfo()
//
// Essa função é usada para persistir a sessão de um usuário que fez login
// no sistema por quatro horas
module.exports = function addLocalStorageInfo(response) {
  localStorage.setItem("authJWTFP", response.data.token.toString());
  let expirationDate = Date.now() + 1000 * 60 * 60 * 4; //Quatro horas
  localStorage.setItem("expiresIn", expirationDate.toString());
};
