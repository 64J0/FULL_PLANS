import React, { useState } from 'react';
import ListItem from './ListItem';
import Buscar from './Buscar';

import './Listar.css';

function Listar({ props, onDelete, onUpdate }) {

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
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Listar;