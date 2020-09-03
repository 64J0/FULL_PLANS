import React, { useState, useRef, useCallback } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import { useAuth } from '../../hooks/auth';

import { Container, InputCustomizado } from './styles';
import logoImage from '../../assets/fullE_icon.png';

function Login() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState(false);

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
    <Container>
      <img src={logoImage} alt="Logo da Full Engenharia" />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>FULL PLANS</legend>

          <InputCustomizado>
            <span><FiMail size={18} color="#333" /></span>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email-login"
              placeholder="E-mail"
            />
          </InputCustomizado>

          <InputCustomizado>
            <span><FiLock size={18} color="#333" /></span>
            <input
              type={visibility ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="senha-login"
              placeholder="Senha"
            />
            <span
              onClick={() => setVisibility(!visibility)}
              style={{ cursor: 'pointer' }}
            >
              {visibility ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
            </span>
          </InputCustomizado>

          <button
            ref={btnLogin}
            type="submit"
            id="btnLogin"
            onClick={() => {
              setVisibility(false)
              disableButton()
            }}
          >
            Logar
          </button>
        </fieldset>
      </form>
    </Container>
  );
}

export default Login;