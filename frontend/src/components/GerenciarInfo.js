import React, { useState, useEffect } from 'react';

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
    const [dataInicio, setDataInicio] = useState(informacao.dataInicio);
    const [dataFinal, setDataFinal] = useState(informacao.dataFinal);
    
    useEffect(() => {

        function updateInfo() {

            if (!informacao._id) {
                informacao._id = Math.round(Math.random()*10e8);
            }
            
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
            
        }

        if ((disciplinaDesenho !== informacao.disciplinaDesenho) || 
            (revisao !== informacao.revisao) ||
            (numFull !== informacao.numFull) ||
            (numCliente !== informacao.numCliente) ||
            (formato !== informacao.formato) ||
            (descricao !== informacao.descricao) ||
            (projetistaDesenho !== informacao.projetistaDesenho) ||
            (verificadorDesenho !== informacao.verificadorDesenho) ||
            (dataInicio !== informacao.dataInicio) ||
            (dataFinal !== informacao.dataFinal)) {
            updateInfo();
        }

    });

    const [boolApagar, setBoolApagar] = useState(false);

    useEffect(() => {

        function handleApagar() {
            new Promise((resolve, reject) => {
                apagarProjeto(informacao._id);
            })
            .then(() => {
                setBoolApagar(false);
            })
            .catch(err => {
                console.log('error: ', err);
            });
        }

        if (boolApagar) {
            var confirmacao = window.confirm('Deseja realmente apagar?');
            if (confirmacao) {
                handleApagar();
            }
            
        }
        
    });

    // ====================================================================

    // Tratamento da data que será apresentada ao usuário
    function tratarDataMostrar(data) {

        var dataSaida = new Date(String(data)),
            ano = String(dataSaida.getFullYear()),
            anoSaida,
            mes = String(parseInt(dataSaida.getUTCMonth()) + 1),
            mesSaida,
            dia = String(parseInt(dataSaida.getDate()) + 1),
            diaSaida;

        anoSaida = ano;

        String(mes).length < 2 ? mesSaida = '0' + mes : mesSaida = mes;
        String(dia).length < 2 ? diaSaida = '0' + dia : diaSaida = dia;

        dataSaida = String(anoSaida) + '-' + String(mesSaida) + '-' + String(diaSaida);
        return(String(dataSaida));

    }

    // ====================================================================

    return(
        <>
            <li className="liGerenciarInfo">

                <div className="descricaoElinkDesenho">
                    <p>
                        Descrição:
                    </p>
                    <input type="text" 
                        name="descricao"
                        value={descricao}
                        onChange={e => {
                            setDescricao(e.target.value)
                        }}
                    />

                    <p>
                        Link do desenho:
                    </p>
                    <input type="text"
                        name="linkDesenho"
                        value={linkDesenho}
                        onChange={e => {
                            setLinkDesenho(e.target.value)
                        }}
                    />  
                </div>
                
                <div className="disciplinaErevisaoEformato">
                    <p>
                        Disciplina:
                    </p>
                    <input type="text" 
                        name="disciplinaDesenho"
                        value={disciplinaDesenho}
                        onChange={e => {
                            setDisciplinaDesenho(e.target.value)
                        }}
                    />

                    <p>
                        Revisão:
                    </p>
                    <input type="text" 
                        name="revisao"
                        value={revisao}
                        onChange={e => {
                            setRevisao(e.target.value)
                        }}
                    />

                    <p>
                        Formato:
                    </p>
                    <input type="text" 
                        name="formato"
                        value={formato}
                        onChange={e => {
                            setFormato(e.target.value)
                        }}
                    />
                </div>
                
                <div className="numFullEnumCliente">
                    <p>
                        Número FULL:
                    </p>
                    <input type="text" 
                        name="numFull"
                        value={numFull}
                        onChange={e => {
                            setNumFull(e.target.value)
                        }}
                    />

                    <p>
                        Número do cliente:
                    </p>
                    <input type="text" 
                        name="numCliente"
                        value={numCliente}
                        onChange={e => {
                            setNumCliente(e.target.value)
                        }}
                    />
                </div>
                
                <div className="projetistaDesenhoEverificadorDesenho">
                    <p>
                        Projetista:
                    </p>
                    <input type="text" 
                        name="projetistaDesenho"
                        value={projetistaDesenho}
                        onChange={e => {
                            setProjetistaDesenho(e.target.value)
                        }}
                    />

                    <p>
                        Verificador:
                    </p>
                    <input type="text" 
                        name="verificadorDesenho"
                        value={verificadorDesenho}
                        onChange={e => {
                            setVerificadorDesenho(e.target.value)
                        }}
                    />
                </div>

                <div className="dataInicioEdataFinal">
                    <p>
                        Data de início:
                    </p>
                    <input type="date" 
                        name="dataInicio"
                        value={tratarDataMostrar(dataInicio)}
                        onChange={e => {
                            setDataInicio(e.target.value)
                        }}
                    />

                    <p>
                        Data do término:
                    </p>
                    <input type="date" 
                        name="dataFinal"
                        value={tratarDataMostrar(dataFinal)}
                        onChange={e => {
                            setDataFinal(e.target.value)
                        }}
                    />
                </div>
                
                {/*
                    Funcionando

                Quando o usuário clicar neste botão deve retirar o card com o id definido neste campo, mas isso deve se suceder apenas localmente, sem que o banco de dados seja atualizado.
                A atalização do banco de dados só deve ser realizada no momento que o usuário clicar em salvar.
                */}
                <button
                    className="deletarInfoProjeto"
                    type="button"
                    onClick={() => setBoolApagar(true)}
                >
                    Apagar
                </button>

            </li>
        </>
    );
};

export default GerenciarInfo;