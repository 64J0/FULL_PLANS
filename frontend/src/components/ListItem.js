import React, { useState, useEffect, useRef } from "react";

import "./ListItem.css";

import calculatePercentage from "../utils/calculatePercentage";

function ListItem({ projeto, display, setProjeto }) {
  const [percentageCalculated] = useState(
    calculatePercentage(projeto.infoProjetos)
  );

  const percentageCounterDiv = useRef(null);

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

  // Redireciona para a página de gerenciamento de projetos, passando como parâmetro os dados do projeto que está sendo mostrado no card específico
  function redirecionar() {
    // setProjeto == setProjetoUpdate do App.js
    setProjeto(projeto);
    display("Gerenciar");
  }

  return (
    <li>
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
            onClick={() => redirecionar()}
          >
            Gerenciar
          </button>
        </div>
      </div>
    </li>
  );
}

export default ListItem;
