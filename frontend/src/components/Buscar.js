import React, { useState, useEffect } from 'react';

import './Buscar.css';

function Buscar({ projetos, onProjetosEncontrados }) {

    const [codigo, setCodigo] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [area, setArea] = useState("");
    const [projetosEncontrados, setProjetosEncontrados] = useState([]);

    useEffect(() => {

        let codigoLength = codigo.length;
        let disciplinaLength = disciplina.length;
        let areaLength = area.length;

        if (!((codigoLength) || (disciplinaLength) || (areaLength))) {
            onProjetosEncontrados(projetos);
        } else {
            onProjetosEncontrados(projetosEncontrados);
        }

    }, [codigo, disciplina, area, projetos, projetosEncontrados, onProjetosEncontrados]);

    useEffect(() => {

        let arrayProjetosEncontrados = [];

        // Transformar em async?
        function searchProjetos() {

            let codigoLength = codigo.length;
            let disciplinaLength = disciplina.length;
            let areaLength = area.length;
            let projetoCodigoTratado, 
                projetoDisciplinaTratada, 
                projetoAreaTratada;

            // Tratamento dos dados

            projetos.map(
                (projeto) => {
                    if (codigoLength && projeto.codigo) {
                        projetoCodigoTratado = projeto.codigo.slice(0, codigoLength).trim().toUpperCase();
                        if (projetoCodigoTratado === codigo) {
                            arrayProjetosEncontrados.push(projeto);
                        }
                    }

                    if (disciplinaLength && projeto.disciplina) {
                        projetoDisciplinaTratada = projeto.disciplina.slice(0, disciplinaLength).trim().toUpperCase();
                        if (projetoDisciplinaTratada === disciplina) {
                            arrayProjetosEncontrados.push(projeto);
                        }
                    }

                    if (areaLength && projeto.area) {
                        projetoAreaTratada = projeto.area.slice(0, areaLength).trim().toUpperCase();
                        if (projetoAreaTratada === area) {
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

    }, [codigo, disciplina, area, projetos]);

    return(
        <div className="buscar">
            <fieldset>
                <legend>Buscar</legend>
                <div className="grid-container">
                    <span>Código</span>
                    <input 
                        type="text" 
                        onChange={(e) => setCodigo(e.target.value.trim().toUpperCase())}
                        value={codigo}
                        id="searchCodigo"
                    />
                    <span>Disciplina</span>
                    <input 
                        type="text" 
                        onChange={(e) => setDisciplina(e.target.value.trim().toUpperCase())}
                        value={disciplina}
                        id="searchDisciplina"
                    />
                    <span>Área</span>
                    <input 
                        type="text" 
                        onChange={(e) => setArea(e.target.value.trim().toUpperCase())}
                        value={area}
                        id="searchArea"
                    />
                </div>
            </fieldset>
        </div>
    );
}

export default Buscar;