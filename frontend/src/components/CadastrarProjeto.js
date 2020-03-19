import React, { useState } from 'react';

import './CadastrarProjeto.css';

function CadastrarProjeto({ onSubmit }) {
    const [cliente, setCliente] = useState('');
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [disciplinaMestre, setDisciplinaMestre] = useState('');
    const [numPedido, setNumPedido] = useState('');
    const [responsavel, setResponsavel] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            cliente,
            nomeProjeto,
            disciplinaMestre,
            numPedido,
            responsavel
        });
    }

    return(

        <div className="cadastrar">
            <h2>
                <strong>CADASTRO</strong>
            </h2>
            <form onSubmit={handleSubmit}>

                <div className="input-block">
                    <label htmlFor="cliente">
                        Cliente
                    </label>
                    <input 
                        type="text" 
                        name="cliente"
                        id="cliente"
                        required
                        value={cliente}
                        onChange={e => setCliente(e.target.value)}
                        autoFocus
                    />
                </div>
                
                <div className="input-block">
                    <label htmlFor="nomeProjeto">
                        Nome do projeto
                    </label>
                    <input 
                        type="text" 
                        name="nomeProjeto"
                        id="nomeProjeto"
                        value={nomeProjeto}
                        onChange={e => setNomeProjeto(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="disciplinaMestre">
                        Disciplina mestre
                    </label>
                    <input 
                        type="text" 
                        name="disciplinaMestre"
                        id="disciplinaMestre"
                        value={disciplinaMestre}
                        onChange={e => setDisciplinaMestre(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="numPedido">
                        Número do pedido
                    </label>
                    <input 
                        type="text" 
                        name="numPedido"
                        id="numPedido"
                        value={numPedido}
                        onChange={e => setNumPedido(e.target.value)} 
                    />
                </div>
                
                <div className="input-block">
                    <label htmlFor="responsavel">
                        Responsável
                    </label>
                    <input 
                        type="text" 
                        name="responsavel"
                        id="responsavel"
                        value={responsavel}
                        onChange={e => setResponsavel(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Cadastrar novo projeto
                </button>
            </form>
        </div>
        
    );
}

export default CadastrarProjeto;