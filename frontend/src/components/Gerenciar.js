import React, { useState } from 'react';
//import GerenciarInfo from './GerenciarInfo';

import './Gerenciar.css';

function UpdateProjeto({ projeto, onUpdateProjeto, display }) {

    const [cliente, setCliente] = useState(projeto.cliente);
    const [nomeProjeto, setNomeProjeto] = useState(projeto.nomeProjeto);
    const [disciplinaMestre, setDisciplinaMestre] = useState(projeto.disciplinaMestre);
    const [numPedido, setNumPedido] = useState(projeto.numPedido);
    const [responsavel, setResponsavel] = useState(projeto.responsavel);
    const [tipoEngenharia, setTipoEngenharia] = useState(projeto.tipoEngenharia);
    const [status, setStatus] = useState(projeto.status);

    const [disciplinaDesenho, setDisciplinaDesenho] = useState(projeto.disciplinaDesenho);
    /*
    const [revisao, setRevisao] = useState(projeto.revisao);
    const [numFull, setNumFull] = useState(projeto.numFull);
    const [numCliente, setNumCliente] = useState(projeto.numCliente);
    const [formato, setFormato] = useState(projeto.formato);
    const [descricao, setDescricao] = useState(projeto.descricao);
    const [projetistaDesenho, setProjetistaDesenho] = useState(projeto.projetistaDesenho);
    const [verificadorDesenho, setVerificadorDesenho] = useState(projeto.verificadorDesenho);
    const [dataInicio, setDataInicio] = useState(projeto.dataInicio);
    const [dataFinal, setDataFinal] = useState(projeto.dataFinal);
    */

    const [arquivado, setArquivado] = useState(projeto.arquivado);

    //const [linkDesenho, setLinkDesenho] = useState('');

    //===========================================================================

    // Os estados das variáveis status e arquivado não são atualizados, e os dados passados no body são os mesmos que já estavam armazenados no banco de dados
    async function arquivar(id) {

        const texto = 'Descrição do status:';
        setStatus(window.prompt(texto, ""));
        setArquivado(!projeto.arquivado);
        console.log(status, arquivado);

        let body = {
            cliente,
            nomeProjeto,
            disciplinaMestre,
            numPedido,
            responsavel,
            tipoEngenharia,
            status,
            disciplinaDesenho,
            arquivado: arquivado
        };

        await onUpdateProjeto(id, body);

    }

    //===========================================================================

    function defineTextoBotaoArquivar() {
        if (projeto.arquivado) {
            return 'Desarquivar';
        } else {
            return 'Arquivar';
        }
    }

    //===========================================================================

    function renderInfo() {
        let count = projeto.disciplinaDesenho.length;
        let x = 0;
        var aux = '';

        do {

            aux += (` 
                <div className="info-area">

                    <div className="input-block">
                        <label htmlFor="disciplinaDesenho">
                            Disciplina do desenho
                        </label>
                        <input 
                            type="text" 
                            name="disciplinaDesenho"
                            required
                            value=${disciplinaDesenho[x]}
                            onChange=${e => setDisciplinaDesenho(e.target.value)}
                        />
                    </div>

                </div>
                `
            );

            x++;

        } while(x < count);

        return aux;
    }

    return(
        <>
        <div className="update-item">
            <div id={projeto._id} className="grid-container">
                <div className="status">
                <h2>Status: {projeto.status}</h2>
                </div>
            <form className="update-form">
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

                <div className="input-block">
                    <label htmlFor="tipoEngenharia">
                        Tipo de engenharia
                    </label>
                    <input 
                        type="text" 
                        name="tipoEngenharia"
                        id="tipoEngenharia"
                        value={tipoEngenharia}
                        onChange={e => setTipoEngenharia(e.target.value)}
                    />
                </div>

                <hr/>

                {
                    renderInfo()
                }

                </form>
                
                

{ /* ================================================================================================ */ }
                <div className="div-buttons">
                    <button
                        type="button"
                        className="btn-adicionarCampos"
                        onClick={() => {
                            // Mostrar os campos de input para adicionar novas informações ao projeto que está aberto
                            console.log(projeto)
                        }}
                    >
                        Adicionar
                    </button>
                    <button
                        type="button"
                        className="btn-salvar"
                        onClick={(e) => {
                            arquivar(projeto._id);
                        }}
                    >
                        Salvar
                    </button>
                    <button 
                        type="button"
                        className="btn-cancelar"
                        onClick={() => {
                            if (arquivado) {
                                display('Arquivados');
                            } else {
                                display('Abertos');
                            }
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="btn-arquivar"
                        onClick={() => {
                            arquivar(projeto._id);
                        }}
                    >
                        {
                            defineTextoBotaoArquivar()
                        }
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default UpdateProjeto;