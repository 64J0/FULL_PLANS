import React from 'react';
import ListItem from './ListItem';

import './Listar.css';

function Listar(data) {
    return(
        <div className="listar">
            <h2>Página de listagem do banco de dados</h2>
            {console.log(data.props)}
            <ul>
                <li>
                    {data.props.map(projeto => (
                        <ListItem 
                            key={projeto._id}
                            projeto={projeto}
                        />
                    ))}
                </li>
            </ul>
        </div>
    );
}

export default Listar;