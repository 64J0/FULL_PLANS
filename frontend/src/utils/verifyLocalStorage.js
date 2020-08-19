// Função criada para verificar o localStorage do navegador do usuário em relação a tokens de sessão salvos.

function verifyLocalStorage() {
  const token = localStorage.getItem("@FullPlans:token");
  const expiresIn = localStorage.getItem("@FullPlans:expiresIn");
  const user = JSON.parse(localStorage.getItem("@FullPlans:user"));

  if (!expiresIn) {
    localStorage.removeItem("@FullPlans:token");
    localStorage.removeItem("@FullPlans:user");
    return { token: null, user: null };
  }

  if (Date.now() > expiresIn) {
    localStorage.removeItem("@FullPlans:token");
    localStorage.removeItem("@FullPlans:expiresIn");
    localStorage.removeItem("@FullPlans:user");
  }

  if (!token) {
    localStorage.removeItem("@FullPlans:expiresIn");
    localStorage.removeItem("@FullPlans:user");
    return { token: null, user: null };
  }

  return { token, user };
}

export default verifyLocalStorage;
