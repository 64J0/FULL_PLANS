// Função criada para verificar o localStorage do navegador do usuário em relação a tokens de sessão salvos.

function verifyLocalStorage() {
  const token = localStorage.getItem("@FullPlans:token");
  const expiresIn = localStorage.getItem("@FullPlans:expiresIn");

  if (!expiresIn) {
    localStorage.removeItem("@FullPlans:token");
    return undefined;
  }

  if (Date.now() > expiresIn) {
    localStorage.removeItem("@FullPlans:token");
    localStorage.removeItem("@FullPlans:expiresIn");
  }

  if (!token) {
    return undefined;
  }

  return token;
}

export default verifyLocalStorage;
