import React from "react";

import ProjCadastrados from "./ProjetosCadastrados";
import ProjStatus from "./ProjetosStatus";

import { Container } from "./styles";

function BIContainer() {
  return (
    <Container>
      <h1>Business Intelligence</h1>

      <ProjCadastrados />
      <ProjStatus />
    </Container>
  );
}

export default BIContainer;