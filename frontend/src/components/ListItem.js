import React from 'react';

import './ListItem.css';

function ListItem({ projeto, display, setProjeto }) {

    function redirecionar() {
        display('UpdateProjeto');
        setProjeto(projeto);
    }

    return(
        <li>
            <div className="list-item">
                <div id={projeto._id} className="grid-container">
                    <p>Cliente: </p>
                    <p>{projeto.cliente}</p>
                    <p>Projeto: </p>
                    <p>{projeto.nomeProjeto}</p>
                    <p>Projetista</p>
                    <p>{projeto.projetista}</p>
                    <p>Verificador</p>
                    <p>{projeto.verificador}</p>
                    <p>Número do pedido</p>
                    <p>{projeto.numPedido}</p>
                    <p>Responsável</p>
                    <p>{projeto.responsavel}</p>
                    <p>Tipo de engenharia</p>
                    <p>{projeto.tipoEngenharia}</p>
                </div>
                <div className="div-buttons">
                    <button
                        type="button"
                        className="btn-editar"
                        onClick={() => redirecionar()}
                    >
                        Mais informações
                    </button>
                </div>
            </div>
        </li>
    );
}

export default ListItem;