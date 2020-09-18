import React, { useState, useCallback } from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import BIContainer from "../../components/BIContainer";
import Modal from "../../components/Modal";
import PasswordInput from "../../components/PasswordInput";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

import { Container, DivCheckbox, ButtonContainer } from "./styles";

export default function UserPage() {
  const { user, setUser } = useAuth();
  const history = useHistory();

  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório!"),
        email: Yup.string()
          .required("E-mail obrigatório!")
          .email("Digite um e-mail válido"),
        newPassword: Yup.string(),
        confirmNewPassword: Yup.string().oneOf(
          [Yup.ref("newPassword"), undefined],
          "As senhas digitadas são diferentes"
        )
      });

      let updatedUser = undefined;
      if (!newPassword) {
        await schema.validate({ name, email }, {
          abortEarly: false,
        });

        setModalOpen(true);
        updatedUser = await api.put(`/user/update/${user._id}`, {
          name,
          email
        });
      } else {
        await schema.validate({ name, email, newPassword, confirmNewPassword }, {
          abortEarly: false,
        });

        setModalOpen(true);
        updatedUser = await api.put(`/user/update/${user._id}`, {
          name,
          email,
          password: newPassword
        });
      }

      if (updatedUser) {
        localStorage.setItem("@FullPlans:user", JSON.stringify(updatedUser.data));

        setUser(updatedUser.data);
      }
    } catch (err) {
      alert(err.message);
      return;
    } finally {
      setModalOpen(false);
    }
  }, [confirmNewPassword, email, name, newPassword, setUser, user._id]);

  const navigateToAdminPage = useCallback(() => {
    history.push("/admin");
  }, [history]);

  const toggleUpdatePasswordArea = () => {
    setShowUpdatePassword(!showUpdatePassword);
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <Container>
      <Modal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
      />
      <h1>PÁGINA DO USUÁRIO</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="name">
            Nome
          </label>
          <input
            className="inputArea"
            type="text"
            placeholder="Nome"
            id="name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
          />
        </div>

        <div className="input-block">
          <label htmlFor="email">
            E-mail
          </label>
          <input
            className="inputArea"
            type="email"
            placeholder="E-mail"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)} value={email}
          />
        </div>

        <DivCheckbox>
          <label htmlFor="changePassword">
            Mudar a senha?
          </label>
          <input
            type="checkbox"
            name="changePassword"
            id="changePassword"
            onChange={toggleUpdatePasswordArea}
          />
        </DivCheckbox>

        {
          showUpdatePassword &&
          (<>
            <div className="input-block">
              <label htmlFor="newPassword">
                Nova senha
              </label>
              <PasswordInput
                placeholder="Nova senha"
                id="newPassword"
                name="newPassword"
                setValue={setNewPassword}
                value={newPassword}
              />
            </div>

            <div className="input-block">
              <label htmlFor="confirmNewPassword">
                Confirme a nova senha
              </label>
              <PasswordInput
                placeholder="Confirme a nova senha"
                id="confirmNewPassword"
                name="confirmNewPassword"
                setValue={setConfirmNewPassword}
                value={confirmNewPassword}
              />
            </div>
          </>)
        }

        <ButtonContainer>
          {user.permission === "admin" && (
            <button type="button" onClick={navigateToAdminPage}>
              Administrar usuários
            </button>
          )}

          <button type="submit">
            Atualizar o usuário
          </button>
        </ButtonContainer>

      </form>

      <hr />
      { user.permission === "admin" && <BIContainer />}
    </Container>
  );
}