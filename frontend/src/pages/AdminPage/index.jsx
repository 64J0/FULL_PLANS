import React, { useState, useCallback } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { BsGearFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container, UserList, ButtonAddUser } from './styles';

export default function AdminPage() {
  const history = useHistory();
  const { user } = useAuth();

  const [usersList, setUsersList] = useState([]);

  const getUsersList = useCallback(async () => {
    const response = await api.post('/user/list', {
      adminId: user._id
    });

    setUsersList(response.data);
  }, [user._id]);

  const goToCreateUserPage = useCallback(() => {
    history.push('/create-user');
  }, [history]);

  return (
    <Container>
      <h2>PÁGINA DO ADMINISTRADOR</h2>

      <button className="principal" type="button" onClick={getUsersList}>
        Listar usuários
      </button>

      <UserList>
        {usersList && usersList.map((administratedUser) => {
          return (
            <li
              key={administratedUser.email}
              className="userListItem">
              <p>{administratedUser.email}</p>
              <p>{administratedUser.name}</p>
              <p>{administratedUser.permission}</p>
              <button type="button">
                <BsGearFill size="1.2rem" />
              </button>
            </li>
          )
        })}
      </UserList>

      <ButtonAddUser type="button" onClick={goToCreateUserPage}>
        <FiUserPlus size="20" />
        <span>Adicionar usuário</span>
      </ButtonAddUser>


    </Container>
  );
}