import React, { useState, useEffect } from 'react';

import './Buscar.css';

function Buscar({ projetos, onProjetosEncontrados }) {

    const [numPedido, setNumPedido] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [projetosEncontrados, setProjetosEncontrados] = useState([]);

    useEffect(() => {

        let numPedidoLength = numPedido.length;
        let disciplinaLength = disciplina.length;

        if (!((numPedidoLength) || (disciplinaLength))) {
            onProjetosEncontrados(projetos);
        } else {
            onProjetosEncontrados(projetosEncontrados);
        }

    }, [numPedido, disciplina, projetos, projetosEncontrados, onProjetosEncontrados]);

    useEffect(() => {

        let arrayProjetosEncontrados = [];

        // Transformar em async?
        function searchProjetos() {

            let numPedidoLength = numPedido.length;
            let disciplinaLength = disciplina.length;
            let projetoNumPedidoTratado, 
                projetoDisciplinaTratada;

            // Tratamento dos dados

            projetos.map(
                (projeto) => {
                    if (numPedidoLength && projeto.numPedido) {
                        projetoNumPedidoTratado = projeto.numPedido.slice(0, numPedidoLength).trim().toUpperCase();
                        if (projetoNumPedidoTratado === numPedido) {
                            arrayProjetosEncontrados.push(projeto);
                        }
                    }

                    if (disciplinaLength && projeto.disciplina) {
                        projetoDisciplinaTratada = projeto.disciplina.slice(0, disciplinaLength).trim().toUpperCase();
                        if (projetoDisciplinaTratada === disciplina) {
                            arrayProjetosEncontrados.push(projeto);
                        }
                    }

                    return null;
                }
            );
            
            return null;
        }

        setProjetosEncontrados(arrayProjetosEncontrados);
        searchProjetos();

    }, [numPedido, disciplina, projetos]);

    return(
        <div className="buscar">
            <fieldset>
                <legend>Buscar</legend>
                <div className="grid-container">
                    <span>Número do pedido</span>
                    <input 
                        type="text" 
                        onChange={(e) => setNumPedido(e.target.value.toUpperCase())}
                        value={numPedido}
                        id="searchNumPedido"
                    />
                    <span>Disciplina</span>
                    <input 
                        type="text" 
                        onChange={(e) => setDisciplina(e.target.value.toUpperCase())}
                        value={disciplina}
                        id="searchDisciplina"
                    />
                </div>
            </fieldset>
        </div>
    );
}

export default Buscar;