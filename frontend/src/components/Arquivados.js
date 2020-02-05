import React from 'react';

import ListItem from './ListItem';

function Arquivados({ props, onDelete, onUpdate }) {

    return(
        <div className="arquivos-arquivados">
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