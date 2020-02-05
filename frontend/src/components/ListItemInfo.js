import React, { useState } from 'react';

//import './ListItemReduzido.css';

function ListItemInfo({ projeto, onDelete, stringPagina }) {

    const [toggle, setToggle] = useState(1);

    const handleClick = (projeto) => {
        let card = document.getElementById(projeto._id);
        let botao = document.getElementById("btn"+projeto._id);

        if (toggle) {
            card.innerHTML = (
                `
                <p>Empresa: </p>
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
                `
                <p>Empresa: </p>
                <p>${projeto.nomeEmpresa}</p>
                <p>Projeto: </p>
                <p>${projeto.nomeProjeto}</p>
                
                `
            );
            botao.innerHTML = '+';
            setToggle(1);
        }
         
    }

    async function handleDeletar(id) {
        await onDelete(id);
    }

    return(
        <li>
            <div className="list-item">
                <div id={projeto._id} className="grid-container">
                    <p>Empresa: </p>
                    <p>{projeto.nomeEmpresa}</p>
                    <p>Projeto: </p>
                    <p>{projeto.nomeProjeto}</p>
                </div>
                <div className="div-buttons">
                    <button 
                        type="button" 
                        id={"btn"+projeto._id}
                        className="btn"
                        onClick={() => handleClick(projeto)}
                    >
                        +
                    </button>
                    <button
                        type="button"
                        className="btn-deletar"
                        onClick={() => handleDeletar(projeto._id)}
                    >
                        Deletar
                    </button>
                    <button
                        type="button"
                        className="btn-editar"
                        onClick={() => stringPagina('Update')}
                    >
                        Editar
                    </button>
                </div>
            </div>
        </li>
    );
}

export default ListItemInfo;