import React, { useState } from 'react';

import './ListItem.css';

function ListItem(data) {

    const [toggle, setToggle] = useState(1);

    const handleClick = (projeto) => {
        let card = document.getElementById(projeto._id);
        let botao = document.getElementById("btn");
        console.log(botao, toggle);

        if (toggle) {
            card.innerHTML = (
                `<p>Empresa: </p>
                <p>${projeto.nomeEmpresa}</p>
                <p>Projeto: </p>
                <p>${projeto.nomeProjeto}</p>
                <p>Disciplina: </p>
                <p>${projeto.disciplina}</p>
                <p>Área: </p>
                <p>${projeto.area}</p>
                <p>Código: </p>
                <p>${projeto.codigo}</p>
                <p>Projetista: </p>
                <p>${projeto.projetista}</p>
                <p>Verificador: </p>
                <p>${projeto.verificador}</p>
                <p>Número do pedido: </p>
                <p>${projeto.numPedido}</p>
                <p>Responsável: </p>
                <p>${projeto.responsavel}</p>
                <p>Revisão: </p>
                <p>${projeto.revisao}</p>
                <p>Número nosso: </p>
                <p>${projeto.numNosso}</p>
                <p>Número do cliente: </p>
                <p>${projeto.numCliente}</p>
                <p>Formatos: </p>
                <p>${projeto.formato}</p>
                <p>Descrição: </p>
                <p>${projeto.descricao}</p>
                <p>Objetivo: </p>
                <p>${projeto.objetivo}</p>
                <p>Tipo da engenharia: </p>
                <p>${projeto.tipoEngenharia}</p>
                `
            );
            botao.innerHTML = '-';
            setToggle(0);
        } else {
            card.innerHTML = (
                `<p>Empresa: </p>
                <p>${projeto.nomeEmpresa}</p>
                <p>Projeto: </p>
                <p>${projeto.nomeProjeto}</p>
                `
            );
            botao.innerHTML = '+';
            setToggle(1);
        }
         
    }

    return(
        <div className="list-item">
            <div id={data.projeto._id} className="grid-container">
                <p>Empresa: </p>
                <p>{data.projeto.nomeEmpresa}</p>
                <p>Projeto: </p>
                <p>{data.projeto.nomeProjeto}</p>
            </div>
            <button 
                type="button" 
                id="btn"
                onClick={() => handleClick(data.projeto)}>+
            </button>
        </div>
    );
}

export default ListItem;