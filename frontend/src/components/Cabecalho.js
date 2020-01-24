import React from 'react';

import './Cabecalho.css';
import Logo from '../fullE_icon.png';

function Cabecalho() {

    return (
        <div className="cabecalho">
            <ul>
                <li><img src={Logo} alt="Ícone da empresa"/></li>
                <li><button>Home</button></li>
                <li><button>Listar</button></li>
                <li><button>Cadastrar</button></li>
            </ul>
            <h1>Planejamento FULL</h1>
        </div>
    );
}

export default Cabecalho;