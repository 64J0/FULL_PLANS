import React, { useState, useRef, useCallback } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import './styles.css';
import logoImage from '../../assets/fullE_icon.png';

function Login() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const btnLogin = useRef(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      if ((!email) || (!password)) {
        throw new Error('Usuário ou senha vazios');
      }

      await signIn({ email, password });
    } catch (err) {
      btnLogin.current.setAttribute('style', '');
      setPassword('');
      return alert(err.message);
    }
  }, [email, password, signIn]);

  // Essa função é responsável por mudar a aparência do botão que faz submit do formulário
  // de login, evitando que o usuário tente clicar mais que uma vez neste componente.
  function disableButton() {
    btnLogin.current.setAttribute('style', `
            background-color: #ccc;
            cursor: not-allowed;`);
  }

  return (
    <div className="login">
      <img src={logoImage} alt="Logo da Full Engenharia" />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Full Plans</legend>
          <hr />
          <div className="inputCustomizado">
            <span><FiMail size={20} color="#333" /></span>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email-login"
              placeholder="E-mail"
            />
          </div>

          <div className="inputCustomizado">
            <span><FiLock size={20} color="#333" /></span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="senha-login"
              placeholder="Senha"
            />
          </div>

          <button ref={btnLogin} type="submit" id="btnLogin" onClick={() => { disableButton() }}>
            Logar
                    </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;