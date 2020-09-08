import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';

import { useAuth } from '../../hooks/auth';

import { Container, UserSection, SignOutDiv } from './styles';

function Header() {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <UserSection>
        <Link to="/user" className="userGreetings">
          <FaUserCircle size={32} />
          Olá, {user.name}!
        </Link>
        <SignOutDiv>
          <button type="button" onClick={signOut}>
            <GoSignOut size={32} />
          </button>
        </SignOutDiv>
      </UserSection>

      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/abertos'>Abertos</Link>
        </li>
        <li>
          <Link to='/arquivados'>Arquivados</Link>
        </li>
        <li>
          <Link to='/cadastrar'>Cadastrar</Link>
        </li>
      </ul>
      <h1>Planejamento FULL</h1>
    </Container>
  );
}

export default Header;