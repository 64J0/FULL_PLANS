import React, { useState, useCallback } from "react";

import ListItem from "../../components/ListItem";
import Buscar from "../../components/Buscar/index";
import { useProjects } from "../../hooks/projects";

import { Container } from "./styles";

function Abertos() {
  const { projetosAbertos, setProjetoUpdate } = useProjects();

  const [projetosEncontrados, setProjetosEncontrados] = useState(projetosAbertos);

  const defineProjetosEncontrados = useCallback((projetos) => {
    setProjetosEncontrados(projetos);
  }, []);

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