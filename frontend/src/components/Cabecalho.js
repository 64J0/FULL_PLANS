import React from 'react';

import './Cabecalho.css';
import Logo from '../fullE_icon.png';

// Foi passada uma referência pra função setStringPagina() do arquivo App.js, desta forma, é possível chamar a função setStringPagina, através do alias stringPagina, neste arquivo inclusive passando os parâmetros que alteram seu funcionamento, que no caso é uma string. Quando a alias da função for chamada, consequentemente a função do arquivo App.js também será chamada e terá o parâmetro passado através da alias.
function Cabecalho({ stringPagina }) {

    return (
        <>
            <ul>
                <li><img src={Logo} alt="Ícone da empresa"/></li>
                <li><button onClick={() => stringPagina('Home')}>Home</button></li>
                <li><button onClick={() => stringPagina('Listar')}>Listar</button></li>
                <li><button onClick={() => stringPagina('Arquivados')}>Arquivados</button></li>
                <li><button onClick={() => stringPagina('Cadastrar')}>Cadastrar</button></li>
            </ul>
            <h1>Planejamento FULL</h1>
        </>
    );
}

export default Cabecalho;