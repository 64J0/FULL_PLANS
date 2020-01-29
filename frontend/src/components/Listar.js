import React from 'react';
import ListItem from './ListItem';

import './Listar.css';

function Listar({ props, onDelete, onUpdate } ) {

    return(
        <div className="listar">
            <h2>Página de listagem do banco de dados</h2>
            <ul>
                <li>
                {props.map(projeto => (
                    <ListItem 
                        key={projeto._id}
                        projeto={projeto}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))}
                </li>
            </ul>
        </div>
    );
}

export default Listar;