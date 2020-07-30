// addLocalStorageInfo()
//
// Essa função é usada para persistir a sessão de um usuário que fez login
// no sistema por quatro horas
export default function addLocalStorageInfo(response) {
  localStorage.setItem("@FullPlans:token", response.data.token);

  let expirationDate = Date.now() + 1000 * 60 * 60 * 4; //Quatro horas

  localStorage.setItem("@FullPlans:expiresIn", expirationDate.toString());

  return null;
};
