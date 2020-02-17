import React, { useState } from 'react';

import './GerenciarInfo.css';

function GerenciarInfo({ informacao, updateInfoProjeto, apagarProjeto }) {

    const [linkDesenho, setLinkDesenho] = useState('https://github.com/gajomon/FULL_PLANS/tree/master' || '');
    const [disciplinaDesenho, setDisciplinaDesenho] = useState(informacao.disciplinaDesenho || '');
    const [revisao, setRevisao] = useState(informacao.revisao || '');
    const [numFull, setNumFull] = useState(informacao.numFull || '');
    const [numCliente, setNumCliente] = useState(informacao.numCliente || '');
    const [formato, setFormato] = useState(informacao.formato || '');
    const [descricao, setDescricao] = useState(informacao.descricao || '');
    const [projetistaDesenho, setProjetistaDesenho] = useState(informacao.projetistaDesenho || '');
    const [verificadorDesenho, setVerificadorDesenho] = useState(informacao.verificadorDesenho || '');
    const [dataInicio, setDataInicio] = useState(informacao.dataInicio || '');
    const [dataFinal, setDataFinal] = useState(informacao.dataFinal || '');

    function updateInfo() {

        updateInfoProjeto(informacao._id, {
            linkDesenho,
            disciplinaDesenho,
            revisao,
            numFull,
            numCliente,
            formato,
            descricao,
            projetistaDesenho,
            verificadorDesenho,
            dataInicio,
            dataFinal
        });

        console.log(informacao);
    }

    async function handleApagar() {
        var confirmacao = window.confirm('Deseja realmente apagar?');
        if (confirmacao) {
            // Apagar essa infoProjeto
            await apagarProjeto(informacao._id);
        } else {
            // Faz nada
            return null;
        }
    }
    

    return(
        <>
            <li className="liGerenciarInfo">

                <p>
                    Link do desenho
                </p>
                <input type="text"
                    name="linkDesenho"
                    value={linkDesenho}
                    onChange={e => {
                        setLinkDesenho(e.target.value)
                        updateInfo()
                    }}
                />

                <p>
                    Disciplina do desenho
                </p>
                <input type="text" 
                    name="disciplinaDesenho"
                    value={disciplinaDesenho}
                    onChange={e => {
                        setDisciplinaDesenho(e.target.value)
                        updateInfo()
                    }}
                />

                <p>
                    Revisão
                </p>
                <input type="text" 
                    name="revisao"
                    value={revisao}
                    onChange={e => {
                        setRevisao(e.target.value)
                        updateInfo()
                    }}
                />

                <p>
                    Número FULL
                </p>
                <input type="text" 
                    name="numFull"
                    value={numFull}
                    onChange={e => {
                        setNumFull(e.target.value)
                        updateInfo()
                    }}
                />

                <p>
                    Número do cliente
                </p>
                <input type="text" 
                    name="numCliente"
                    value={numCliente}
                    onChange={e => {
                        setNumCliente(e.target.value)
                        updateInfo()
                    }}
                />

                <p>
                    Formato
                </p>
                <input type="text" 
                    name="formato"
                    value={formato}
                    onChange={e => {
                        setFormato(e.target.value)
                        updateInfo()
                    }}
                />

                <p>
                    Descrição
                </p>
                <input type="text" 
                    name="descricao"
                    value={descricao}
                    onChange={e => {
                        setDescricao(e.target.value)
                        updateInfo()
                    }}
                />

                <p>
                    Projetista do desenho
                </p>
                <input type="text" 
                    name="projetistaDesenho"
                    value={projetistaDesenho}
                    onChange={e => {
                        setProjetistaDesenho(e.target.value)
                        updateInfo()
                    }}
                />

                <p>
                    Verificador do desenho
                </p>
                <input type="text" 
                    name="verificadorDesenho"
                    value={verificadorDesenho}
                    onChange={e => {
                        setVerificadorDesenho(e.target.value)
                        updateInfo()
                    }}
                />

                <p>
                    Data de início
                </p>
                <input type="date" 
                    name="dataInicio"
                    value={dataInicio}
                    onChange={e => {
                        setDataInicio(e.target.value)
                        updateInfo()
                    }}
                />

                <p>
                    Data do término
                </p>
                <input type="date" 
                    name="dataFinal"
                    value={dataFinal}
                    onChange={e => {
                        setDataFinal(e.target.value)
                        updateInfo()
                    }}
                />

                <button
                    className="deletarInfoProjeto"
                    type="button"
                    onClick={() => handleApagar()}
                >
                    Apagar
                </button>

            </li>

            <hr/>
        </>
    );
};

export default GerenciarInfo;