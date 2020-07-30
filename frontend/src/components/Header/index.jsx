import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import Logo from '../../assets/fullE_icon.png';

function Header() {

  return (
    <Container>
      <ul>
        <li><img src={Logo} alt="Ícone da empresa" /></li>
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