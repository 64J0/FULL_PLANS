import React, { useState } from 'react';
import ListItem from './ListItem';
import Buscar from './Buscar';

import './Abertos.css';

function Abertos({ props, display, setProjeto }) {

    const [projetosEncontrados, setProjetosEncontrados] = useState([]);

    function defineProjetosEncontrados(projetos) {
        setProjetosEncontrados(projetos);
    }

    return(
        <div className="listar">
            <h2>Projetos Abertos</h2>
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

export default Abertos;