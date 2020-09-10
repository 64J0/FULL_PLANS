import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { Container, PercentageCounter, ProjectInfo } from "./styles";

import calculatePercentage from "../../utils/calculatePercentage";

function ListItem({ projeto }) {
  const history = useHistory();
  const percentageCounterDiv = useRef(null);

  const [percentageCalculated] = useState(
    calculatePercentage(projeto.infoProjetos)
  );

  const handleGerenciarProjeto = useCallback(() => {
    history.push({
      pathname: "/gerenciar",
      state: { projeto }
    });
  }, [projeto, history]);

  useEffect(() => {
    function changeColors() {
      let counterColor;
      if (percentageCalculated < 25) {
        counterColor = "red";
      } else if (percentageCalculated >= 25 && percentageCalculated < 50) {
        counterColor = "orange";
      } else if (percentageCalculated >= 50 && percentageCalculated < 75) {
        counterColor = "purple";
      } else if (percentageCalculated >= 75 && percentageCalculated < 100) {
        counterColor = "blue";
      } else {
        counterColor = "green";
      }

      percentageCounterDiv.current.style.border = `2px solid ${counterColor}`;
      percentageCounterDiv.current.style.color = counterColor;
      return null;
    }

    if (percentageCounterDiv.current) {
      changeColors();
    }
  }, [percentageCalculated]);

  return (
    <Container>
      <PercentageCounter>
        <p ref={percentageCounterDiv}>{percentageCalculated}% concluído!</p>
      </PercentageCounter>
      <ProjectInfo id={projeto._id}>
        <div>
          <span>Status:</span>
          <p>{projeto.status || "-"}</p>
        </div>
        <div>
          <span>Cliente: </span>
          <p>{projeto.cliente || "-"}</p>
        </div>
        <div>
          <span>Nome do projeto: </span>
          <p>{projeto.nomeProjeto || "-"}</p>
        </div>
        <div>
          <span>Disciplina mestre:</span>
          <p>{projeto.disciplinaMestre || "-"}</p>
        </div>
        <div>
          <span>Número do pedido:</span>
          <p>{projeto.numPedido || "-"}</p>
        </div>
        <div>
          <span>Responsável:</span>
          <p>{projeto.responsavel || "-"}</p>
        </div>
      </ProjectInfo>
      <div className="div-buttons">
        <button
          type="button"
          className="btn-editar"
          onClick={handleGerenciarProjeto}
        >
          Gerenciar
        </button>
      </div>
    </Container>
  );
}

export default ListItem;
