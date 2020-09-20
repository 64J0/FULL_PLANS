import React from "react";

import ProjCadastrados from "./ProjetosCadastrados";
import ProjStatus from "./ProjetosStatus";
import ProjFinalizados from "./ProjetosFinalizados";

import { Container } from "./styles";

function BIContainer() {
  return (
    <Container>
      <h1>Business Intelligence</h1>

      <ProjCadastrados />
      <ProjStatus />
      <ProjFinalizados />
    </Container>
  );
}

export default BIContainer;