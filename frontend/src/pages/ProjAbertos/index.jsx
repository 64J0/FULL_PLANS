import React, { useState } from 'react';

import ListItem from '../../components/ListItem';
import Buscar from '../../components/Buscar/index';
import { useProjectsManagement } from '../../hooks/projectsManagement';

import { Container } from './styles';

function Abertos() {
  const { projetosAbertos, setProjetoUpdate } = useProjectsManagement();

  const [projetosEncontrados, setProjetosEncontrados] = useState([]);

  function defineProjetosEncontrados(projetos) {
    setProjetosEncontrados(projetos);
  }

  return (
    <Container>
      <h2>Projetos Abertos</h2>
      <Buscar projetos={projetosAbertos} onProjetosEncontrados={defineProjetosEncontrados} />
      <ul>
        {projetosEncontrados.map(projeto => (
          <ListItem
            key={String(projeto._id)}
            projeto={projeto}
            setProjeto={setProjetoUpdate}
          />
        ))}
      </ul>
    </Container>
  );
}

export default Abertos;