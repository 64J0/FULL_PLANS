import React, { useState, useEffect } from 'react';
import GerenciarInfo from './GerenciarInfo';

import './Gerenciar.css';
import api from '../services/api';

// projeto === projetoUpdate
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

    useEffect(() => {
        //console.log('projetoUpdate dentro de Gerenciar: ', projeto)
        setInfoProjetos(projeto.infoProjetos);
    }, [projeto]);


    //const [toggleSalvar, setToggleSalvar] = useState(false);
    /*
     * FUNCIONANDO -> esta função seta o estado da propriedade arquivado do projeto e muda a tela de visualização que é exibida para o usuário, com base no estado atual que foi alterado
     */
    useEffect(() => {

        async function arquivar(id) {

            if (arquivado !== projeto.arquivado) {
                new Promise((resolve, reject) => {
                    const texto = 'Descrição do status:';
                    let novoStatus = window.prompt(texto, "");
                    novoStatus = novoStatus.toUpperCase();
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
                        arquivado
                    };

                    return(body);
                })
                .then((body) => {
                    onUpdateProjeto(id, body);
                })
                .then(() => {
                    decideWhatToDisplay();
                })
                .catch((err) => {
                    console.log('Ocorreu um erro :(', err);
                    return(err);
                });
            }
            
        }

        arquivar(projeto._id);

    });

    //===========================================================================

    /*
     * FUNCIONANDO -> Esta função troca a tela que é exibida para o usuário
     */

    function decideWhatToDisplay() {
        if (arquivado) {
            display('Arquivados');
        } else {
            display('Abertos');
        }
    }

    //===========================================================================

    function apagarProjeto(id) {

        setInfoProjetos(infoProjetos.filter(infoProjeto => infoProjeto._id !== id));

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

    async function salvar(id) {

        var body = {
            cliente,
            nomeProjeto,
            disciplinaMestre,
            numPedido,
            responsavel,
            tipoEngenharia,
            status,
            infoProjetos,
            arquivado
        };

        //console.log('projeto dentro de gerenciar: ', projeto);
        //console.log('infoProjetos em gerenciar: ', infoProjetos);
        //console.log('body: ', body);
        await onUpdateProjeto(id, body)
        .then(() => {
            if (infoProjetos !== projeto.infoProjetos) {
                setInfoProjetos(projeto.infoProjetos);
            }
        });

    }

    //===========================================================================


    async function novosCampos() {

        let novaInfoProjeto = { 
            'disciplinaDesenho': '',
            'revisao': '',
            'numFull': '',
            'numCliente': '',
            'formato': '',
            'descricao': '',
            'projetistaDesenho': '',
            'verificadorDesenho': '',
            'dataInicio': '01-01-2020',
            'dataFinal': '02-01-2020'
        }
        
        setInfoProjetos([...infoProjetos, novaInfoProjeto]);
        
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

    async function gerarPlanilha() {

        await api.get(`/excel/${projeto._id}`);

    }

    //===========================================================================

    return(
        <>
        <div className="update-item">
            <div id={projeto._id} className="grid-container">

            <form className="update-form">
                <div className="input-block">
                    <label htmlFor="status">
                        Status
                    </label>
                    <input 
                        type="text" 
                        name="status"
                        required
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="cliente">
                        Cliente
                    </label>
                    <input 
                        type="text" 
                        name="cliente"
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
                        value={tipoEngenharia}
                        onChange={e => setTipoEngenharia(e.target.value)}
                    />
                </div>

                {
                /*
                 * InfoProjetos -> Não atualiza o _id quando o infoProjetos é atualizado
                 */
                }
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

                    {/*
                        Funcionando 
                    Adiciona os campos de input para adicionar novas informações ao projeto que está aberto
                    */}
                    <button
                        type="button"
                        className="btn-adicionarCampos"
                        onClick={() => { novosCampos() }}
                    >
                        Adicionar
                    </button>

                    {/* 
                        Funcionando
                    Quando o usuário clicar neste botão
                    */}
                    <button
                        type="button"
                        className="btn-salvar"
                        onClick={() => { salvar(projeto._id) }}
                    >
                        Salvar
                    </button>

                    {/* 
                        Funcionando 
                    Quando o usuário clicar neste botão ele deve ser redirecionado para a página que estava anteriormente, que pode ser definida com base no valor do estado arquivado.
                    */}
                    <button 
                        type="button"
                        className="btn-cancelar"
                        onClick={() => { decideWhatToDisplay() }}
                    >
                        Cancelar
                    </button>

                    {/*
                        Funcionando
                    Quando este botão for clicado, deve abrir uma janela pop-up para que o usuário possa atualizar o valor do estado de status. 
                     */}
                    <button
                        type="button"
                        className="btn-arquivar"
                        onClick={() => { setArquivado(!projeto.arquivado) }}
                    > 
                        {
                            defineTextoBotaoArquivar()
                        }
                    </button>
                </div>

                <div className="btn-planilha">
                    <button
                        type="button"
                        className="btn-criar-planilha"
                        onClick={() => { gerarPlanilha() }}
                    >
                        Gerar planilha!
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default UpdateProjeto;