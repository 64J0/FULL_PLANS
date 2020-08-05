import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHistory } from 'react-router-dom';

import { Container } from "./styles";

import calculatePercentage from "../../utils/calculatePercentage";

function ListItem({ projeto, setProjeto }) {
  const history = useHistory();
  const percentageCounterDiv = useRef(null);

  const [percentageCalculated] = useState(
    calculatePercentage(projeto.infoProjetos)
  );

  const handleGerenciarProjeto = useCallback(() => {
    history.push({
      pathname: '/gerenciar',
      state: { projeto }
    })
  }, [projeto, history]);

  useEffect(() => {
    function changeColors() {
      if (percentageCalculated < 25) {
        percentageCounterDiv.current.style.border = "2px solid red";
        percentageCounterDiv.current.style.color = "red";
        return null;
      } else if (percentageCalculated >= 25 && percentageCalculated < 50) {
        percentageCounterDiv.current.style.border = "2px solid orange";
        percentageCounterDiv.current.style.color = "orange";
        return null;
      } else if (percentageCalculated >= 50 && percentageCalculated < 75) {
        percentageCounterDiv.current.style.border = "2px solid purple";
        percentageCounterDiv.current.style.color = "purple";
        return null;
      } else if (percentageCalculated >= 75 && percentageCalculated < 100) {
        percentageCounterDiv.current.style.border = "2px solid blue";
        percentageCounterDiv.current.style.color = "blue";
        return null;
      } else {
        percentageCounterDiv.current.style.border = "2px solid green";
        percentageCounterDiv.current.style.color = "green";
        return null;
      }
    }

    if (percentageCounterDiv.current) {
      changeColors();
    }
  }, [percentageCalculated]);

  return (
    <Container>
      <div className="list-item">
        <div className="percentageCounter">
          <p ref={percentageCounterDiv}>{percentageCalculated}% concluído!</p>
        </div>
        <div id={projeto._id} className="grid-container">
          <p>Status:</p>
          <p>{projeto.status}</p>
          <p>Cliente: </p>
          <p>{projeto.cliente}</p>
          <p>Nome do projeto: </p>
          <p>{projeto.nomeProjeto}</p>
          <p>Disciplina mestre</p>
          <p>{projeto.disciplinaMestre}</p>
          <p>Número do pedido</p>
          <p>{projeto.numPedido}</p>
          <p>Responsável</p>
          <p>{projeto.responsavel}</p>
        </div>
        <div className="div-buttons">
          <button
            type="button"
            className="btn-editar"
            onClick={handleGerenciarProjeto}
          >
            Gerenciar
          </button>
        </div>
      </div>
    </Container>
  );
}

export default ListItem;
