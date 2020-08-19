import React, { useState, useCallback } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import PasswordInput from '../../components/PasswordInput';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import { Container, InputBlock } from './styles';

export default function CreateUserPage() {
  const { user } = useAuth();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [permission, setPermission] = useState("read");

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      if (!name || !email || !password || !permission) {
        throw new Error("É necessário informar todas as propriedades do usuário antes de tentar criá-lo!")
      }

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório!"),
        email: Yup.string()
          .required("E-mail obrigatório!")
          .email("Digite um e-mail válido"),
        password: Yup.string(),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref("password"), undefined],
          "As senhas digitadas são diferentes"
        ),
        permission: Yup.string().oneOf(["read", "write", "admin"])
      });

      await schema.validate({ name, email, password, passwordConfirmation, permission }, {
        abortEarly: false,
      });

      await api.post("/user/create", {
        adminId: user._id,
        name,
        email,
        password,
        permission
      })
        .then(() => {
          history.push("/admin");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } catch (err) {
      alert(err.message);
    }
  }, [email, history, name, password, passwordConfirmation, permission, user._id]);

  return (
    <Container>
      <h2>CRIAR USUÁRIO</h2>

      <form onSubmit={handleFormSubmit}>
        <InputBlock>
          <label htmlFor="name">
            Nome
          </label>
          <input
            type="text"
            name="name"
            placeholder="Digite o nome do usuário"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </InputBlock>

        <InputBlock>
          <label htmlFor="email">
            E-mail
          </label>
          <input
            type="text"
            name="email"
            placeholder="Digite o e-mail do usuário"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </InputBlock>

        <InputBlock>
          <label htmlFor="password">
            Senha
          </label>
          <PasswordInput
            placeholder="Digite a senha do usuário"
            id="password"
            name="password"
            setValue={setPassword}
            value={password}
          />
        </InputBlock>

        <InputBlock>
          <label htmlFor="passwordConfirmation">
            Confirme a senha
          </label>
          <PasswordInput
            placeholder="Confirme a senha do usuário"
            id="passwordConfirmation"
            name="passwordConfirmation"
            setValue={setPasswordConfirmation}
            value={passwordConfirmation}
          />
        </InputBlock>

        <InputBlock>
          <label htmlFor="permission">
            Permissão
          </label>
          <select
            id="permission"
            name="permission"
            defaultValue="read"
            onChange={(e) => setPermission(e.target.value)}
          >
            <option value="read">Leitura</option>
            <option value="write">Escrita</option>
            <option value="admin">Administrador</option>
          </select>
        </InputBlock>

        <button type="submit">
          Cadastrar o usuário!
        </button>
      </form>
    </Container>
  );
}