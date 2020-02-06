import React from 'react';

import ListItem from './ListItem';
import './Arquivados.css';

function Arquivados({ props, onDelete, onUpdate }) {

    return(
        <div className="projetos-arquivados">
            <h2>Projetos Arquivados</h2>
            <ul>
                {props.map(projeto => (
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

export default Arquivados;