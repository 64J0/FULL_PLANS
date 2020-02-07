import React, { useState } from 'react';
import UpdateProjeto from './UpdateProjeto';
import ListItemInfo from './ListItemInfo';

import './ListItem.css';

function ListItem({ projeto, onDelete, onUpdate }) {

    const [stringPagina, setStringPagina] = useState('');

    function decideWhatToDisplay() {
        switch(stringPagina){
            case 'Update':
                return (
                    <UpdateProjeto projeto={projeto} onUpdate={onUpdate} onDelete={onDelete} setStringPagina={setStringPagina} />
                );

            default :
                return (
                    <ListItemInfo projeto={projeto} onUpdate={onUpdate} onDelete={onDelete} stringPagina={setStringPagina} />
                );
        }
    }

    // ==================================================================================================================

    return(
        <>
         {
             decideWhatToDisplay()
         }
        </>
    );
}

export default ListItem;