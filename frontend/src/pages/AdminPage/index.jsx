import React, { useState, useCallback } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import UserListItem from '../../components/UserListItem';

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
            <UserListItem
              key={administratedUser.email}
              administratedUser={administratedUser}
              adminId={user._id}
              usersList={usersList}
              setUsersList={setUsersList}
            />
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