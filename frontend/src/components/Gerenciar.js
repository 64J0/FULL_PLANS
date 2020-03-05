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

    const [arquivado, setArquivado] = useState(projeto.arquivado);
    const [status, setStatus] = useState(projeto.status);

    const [infoProjetos, setInfoProjetos] = useState(projeto.infoProjetos);

    const [toggleNovoCampo, setToggleNovoCampo] = useState(false);

    useEffect(() => {
        console.log('projeto', projeto);
        setInfoProjetos(projeto.infoProjetos);
    }, [projeto]);

    useEffect(() => {
        if (toggleNovoCampo) {
            setToggleNovoCampo(false);
            salvar(projeto._id);
        }
    });


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
            status,
            infoProjetos,
            arquivado
        };

        await onUpdateProjeto(id, body)
        .then(() => {
            if (infoProjetos !== projeto.infoProjetos) {
                setInfoProjetos(projeto.infoProjetos);
            }
        });

    }

    //===========================================================================


    function novosCampos() {
        let novaInfoProjeto = { 
            'linkDesenho': '',
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
        };
        setInfoProjetos([...infoProjetos, novaInfoProjeto]);
        setToggleNovoCampo(true);
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

        /*
        await api.get(`/excel/${projeto._id}`, { responseType: 'arraybuffer' })
        .then((response) => {
            //var blob = new Blob([response.data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            window.location.replace(response.request.responseURL);
            console.log(response)
        })
        .catch(err => console.log(err));
        */


        // js-file-download Package:
        var jsFileDownload = function(data, filename, mime, bom) {
            var blobData = (typeof bom !== 'undefined') ? [bom, data] : [data];
            var blob = new Blob(blobData, {type: mime || 'application/octet-stream'});
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // IE workaround for "HTML7007: One or more blob URLs were
                // revoked by closing the blob for which they were created.
                // These URLs will no longer resolve as the data backing
                // the URL has been freed."
                window.navigator.msSaveBlob(blob, filename);
            } else {
                var blobURL = (window.URL ? window.URL : window.webkitURL).createObjectURL(blob);
                var tempLink = document.createElement('a');
                tempLink.style.display = 'none';
                tempLink.href = blobURL;
                tempLink.setAttribute('download', filename);
        
                // Safari thinks _blank anchor are pop ups. We only want to set _blank
                // target if the browser does not support the HTML5 download attribute.
                // This allows you to download files in desktop safari if pop up blocking
                // is enabled.
                if (typeof tempLink.download === 'undefined') {
                    tempLink.setAttribute('target', '_blank');
                }
        
                document.body.appendChild(tempLink);
                tempLink.click();
        
                // Fixes "webkit blob resource error 1"
                setTimeout(function() {
                    document.body.removeChild(tempLink);
                    window.URL.revokeObjectURL(blobURL);
                }, 0);
            }
        }

        await api.get(`/excel/${projeto._id}`, { responseType: 'arraybuffer' })
        .then((response) => {
            var fileName = String('GRD_' + Date.now() + '.xlsx');
            jsFileDownload(response.data, fileName);
        })
        

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
                        Add Campos
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