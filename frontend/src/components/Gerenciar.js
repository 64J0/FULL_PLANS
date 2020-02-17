import React, { useState } from 'react';
import GerenciarInfo from './GerenciarInfo';

import './Gerenciar.css';

function UpdateProjeto({ projeto, onUpdateProjeto, display }) {

    const [cliente, setCliente] = useState(projeto.cliente);
    const [nomeProjeto, setNomeProjeto] = useState(projeto.nomeProjeto);
    const [disciplinaMestre, setDisciplinaMestre] = useState(projeto.disciplinaMestre);
    const [numPedido, setNumPedido] = useState(projeto.numPedido);
    const [responsavel, setResponsavel] = useState(projeto.responsavel);
    const [tipoEngenharia, setTipoEngenharia] = useState(projeto.tipoEngenharia);

    const [arquivado, setArquivado] = useState(projeto.arquivado);
    const [status, setStatus] = useState(projeto.status);

    const [infoProjetos, setInfoProjetos] = useState(projeto.infoProjetos);

    //===========================================================================

    function decideWhatToDisplay() {
        if (arquivado) {
            display('Arquivados');
        } else {
            display('Abertos');
        }
    }

    //===========================================================================

    async function apagarProjeto(id) {

        setInfoProjetos(infoProjetos.filter(infoProjeto => infoProjeto._id !== id));
        await salvar(projeto._id);

    }

    //===========================================================================

    async function salvar(id) {
        await onUpdateProjeto(id, {
            cliente,
            nomeProjeto,
            disciplinaMestre,
            numPedido,
            responsavel,
            tipoEngenharia,
            status,
            infoProjetos,
            arquivado
        });
    }

    //===========================================================================

    function updateInfoProjeto(id, data) {

        var index = infoProjetos.findIndex(x => x._id === id);

        data._id = id;
        setInfoProjetos([
        ...infoProjetos.slice(0, index),
        data,
        ...infoProjetos.slice(index+1)
        ]);
    
    }

    //===========================================================================

    function novosCampos() {

        let novaInfoProjeto = { 
            'disciplinaDesenho': '',
            'revisao': '',
            'numFull': '',
            'numCliente': '',
            'formato': '',
            'descricao': '',
            'projetistaDesenho': '',
            'verificadorDesenho': '',
            'dataInicio': '',
            'dataFinal': ''
        }

        setInfoProjetos([...infoProjetos, novaInfoProjeto]);
        salvar(projeto._id);
        console.log(infoProjetos);
    }

    //===========================================================================

    async function arquivar(id) {

        new Promise((resolve, reject) => {
            const texto = 'Descrição do status:';
            let novoStatus = window.prompt(texto, "");
            setStatus(novoStatus);
            setArquivado(!arquivado);
            resolve(novoStatus);
        })
        .then((novoStatus) => {
            var body = {
                cliente,
                nomeProjeto,
                disciplinaMestre,
                numPedido,
                responsavel,
                tipoEngenharia,
                status: novoStatus,
                infoProjetos,
                arquivado: !projeto.arquivado
            };

            console.log(novoStatus, projeto.arquivado, body);
            return(body);
        })
        .then((body) => {
            onUpdateProjeto(id, body);
        })
        .then(() => {
            decideWhatToDisplay();
        })
        .catch(() => {
            console.log('Ocorreu um erro :(');
        });

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

                <ol>
                    {infoProjetos.map(informacao => (
                        <GerenciarInfo 
                            key={String(informacao._id)}
                            informacao={informacao}
                            updateInfoProjeto={updateInfoProjeto}
                            apagarProjeto={apagarProjeto}
                        />
                    ))}
                </ol>

            </form>
                
                
{ /* ================================================================================================ */ }

                <div className="div-buttons">

                    {/* Não funcionando */}
                    <button
                        type="button"
                        className="btn-adicionarCampos"
                        onClick={() => {
                            // Mostrar os campos de input para adicionar novas informações ao projeto que está aberto
                            novosCampos();
                        }}
                    >
                        Adicionar
                    </button>

                    {/* 
                        Não funcionando (parcialmente)
                        Falta salvar os conteúdos dos cards abaixo da 
                    */}
                    <button
                        type="button"
                        className="btn-salvar"
                        onClick={() => {
                            salvar(projeto._id);
                        }}
                    >
                        Salvar
                    </button>

                    {/* Funcionando */}
                    <button 
                        type="button"
                        className="btn-cancelar"
                        onClick={() => {
                            decideWhatToDisplay()
                        }}
                    >
                        Cancelar
                    </button>

                    {/* Funcionando */}
                    <button
                        type="button"
                        className="btn-arquivar"
                        onClick={() => {
                            arquivar(projeto._id)
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