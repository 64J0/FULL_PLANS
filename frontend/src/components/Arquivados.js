import React, { useState } from 'react';
import ListItem from './ListItem';
import Buscar from './Buscar';

import './Arquivados.css';

function Arquivados({ props, display, setProjeto }) {

    const [projetosEncontrados, setProjetosEncontrados] = useState([]);

    function defineProjetosEncontrados(projetos) {
        setProjetosEncontrados(projetos);
    }

    return(
        <div className="projetos-arquivados">
            <h2>Projetos Arquivados</h2>
            <Buscar projetos={props} onProjetosEncontrados={defineProjetosEncontrados} />
            <ul>
                {projetosEncontrados.map(projeto => (
                    <ListItem 
                        key={String(projeto._id)}
                        projeto={projeto}
                        display={display}
                        setProjeto={setProjeto}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Arquivados;