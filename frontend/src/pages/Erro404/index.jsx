import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi'

import { Container } from './styles';

export default function Erro404() {
  return (
    <Container>
      <FiAlertTriangle size={36} />
      <h1>Erro 404</h1>
      <p>Página não encontrada</p>
    </Container>
  );
}