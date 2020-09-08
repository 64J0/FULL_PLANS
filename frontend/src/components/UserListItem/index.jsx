import React, { useCallback, useState } from 'react';
import { MdSave } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';

import api from '../../services/api';

import { Container } from "./styles";

export default function UserListItem({ administratedUser, adminId, setUsersList, usersList }) {
  const [permission, setPermission] = useState(administratedUser.permission);

  const saveUserEdits = useCallback(async () => {
    const id = administratedUser._id;
    await api.put(`/user/update/${id}`, {
      adminId,
      permission
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  }, [adminId, administratedUser._id, permission]);

  const deleteUser = useCallback(async () => {
    const deleteConfirmation = window.confirm('Deseja realmente apagar esse usuário?');
    const id = administratedUser._id;

    if (deleteConfirmation) {
      await api.delete(`/user/delete/${id}`, {
        data: {
          adminId
        }
      }).then(() => {
        const newUsersList = usersList.filter(user => user._id !== id);
        setUsersList(newUsersList);
      }).catch((err) => {
        window.alert(err.response.data.message);
      });
    }
  }, [adminId, administratedUser._id, setUsersList, usersList]);

  return (
    <Container>
      <p>{administratedUser.email}</p>
      <p>{administratedUser.name}</p>
      <select
        value={permission}
        onChange={(e) => setPermission(e.target.value)}
      >
        <option value="read">Leitura</option>
        <option value="write">Escrita</option>
        <option value="admin">Administrador</option>
      </select>
      <button
        type="button"
        onClick={saveUserEdits}
      >
        <MdSave size="1.8rem" />
      </button>
      <button
        type="button"
        onClick={deleteUser}
      >
        <TiDelete size="1.8rem" color="#800000" />
      </button>
    </Container>
  );
}