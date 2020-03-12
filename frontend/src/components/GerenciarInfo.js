import React, { useState, useEffect } from 'react';

import './GerenciarInfo.css';

function GerenciarInfo({ informacao, updateInfoProjeto, apagarProjeto, projeto }) {

    const [linkDesenho, setLinkDesenho] = useState(informacao.linkDesenho || 'https://github.com/gajomon/FULL_PLANS/tree/master');
    const [tipoEngenharia, setTipoEngenharia] = useState(informacao.tipoEngenharia || '');
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
    

    // updateInfo()
    //
    // Esse trecho de código é responsável por atualizar o estado da propriedades infoProjetos
    // do projeto que está sendo trabalhado. Essa função, basicamente, fica escutando as alterações
    // dos estados dos componentes dos formulários. Quando ela percebe alguma alteração já
    // chama uma função de setState passando os dados atualizados.
    useEffect(() => {
        function updateInfo() {
            updateInfoProjeto(informacao._id, {
                linkDesenho,
                tipoEngenharia,
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

        if ((linkDesenho !== informacao.linkDesenho) ||
            (tipoEngenharia !== informacao.tipoEngenharia) ||
            (disciplinaDesenho !== informacao.disciplinaDesenho) || 
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


    // handleApagar()
    //
    // Esse trecho de código é responsável por apagar uma infoProjeto específica
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


    // tratarDataMostrar
    //
    // Essa função faz o tratamento da data que será apresentada ao usuário, para
    // deixá-la de acordo com a convenção brasileira.
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


    // copiarDadosProjetoAnterior()
    //
    // Essa função é responsável por adicionar o conteúdo do projeto acima às células do
    // projeto de baixo. Foi uma requisição da utilizadora do sistema.
    // OS ESTADOS DO COMPONENTE NÃO SÃO ATUALIZADOS AUTOMATICAMENTE QUANDO O VALUE É ALTERADO 
    function copiarDadosProjetoAnterior() {
        var index = projeto.infoProjetos.findIndex(x => x._id === informacao._id);
        let descricaoInput = document.getElementsByClassName('descricao')[index],
            tipoEngenhariaInput = document.getElementsByClassName('tipoEngenharia')[index],
            linkDesenhoInput = document.getElementsByClassName('linkDesenho')[index],
            disciplinaDesenhoInput = document.getElementsByClassName('disciplinaDesenho')[index],
            revisaoInput = document.getElementsByClassName('revisao')[index],
            formatoInput = document.getElementsByClassName('formato')[index],
            numFullInput = document.getElementsByClassName('numFull')[index],
            numClienteInput = document.getElementsByClassName('numCliente')[index],
            projetistaDesenhoInput = document.getElementsByClassName('projetistaDesenho')[index],
            verificadorDesenhoInput = document.getElementsByClassName('verificadorDesenho')[index];
        descricaoInput.value            = projeto.infoProjetos[index - 1].descricao;
        tipoEngenhariaInput.value       = projeto.infoProjetos[index - 1].tipoEngenharia;
        linkDesenhoInput.value          = projeto.infoProjetos[index - 1].linkDesenho;
        disciplinaDesenhoInput.value    = projeto.infoProjetos[index - 1].disciplinaDesenho;
        revisaoInput.value              = projeto.infoProjetos[index - 1].revisao;
        formatoInput.value              = projeto.infoProjetos[index - 1].formato;
        numFullInput.value              = projeto.infoProjetos[index - 1].numFull;
        numClienteInput.value           = projeto.infoProjetos[index - 1].numCliente;
        projetistaDesenhoInput.value    = projeto.infoProjetos[index - 1].projetistaDesenho;
        verificadorDesenhoInput.value   = projeto.infoProjetos[index - 1].verificadorDesenho;
    }


    return(
        <>
            <li className="liGerenciarInfo">
                <div className="descricaoEtipoEngenharia">
                    <p>
                        Descrição:
                    </p>
                    <input type="text"
                        className="descricao" 
                        name="descricao"
                        value={descricao}
                        onChange={e => {
                            setDescricao(e.target.value)
                        }}
                    />

                    <p>
                        Engenharia:
                    </p>
                    <input type="text" 
                        className="tipoEngenharia"
                        name="tipoEngenharia"
                        value={tipoEngenharia}
                        onChange={e => {
                            setTipoEngenharia(e.target.value)
                        }}
                    />
                </div>

                <div className="linkDesenho">
                    <p>
                        Link do desenho:
                    </p>
                    <input type="text"
                        className="linkDesenho"
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
                        className="disciplinaDesenho"
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
                        className="revisao"
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
                        className="formato"
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
                        className="numFull"
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
                        className="numCliente"
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
                        className="projetistaDesenho"
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
                        className="verificadorDesenho"
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
                        className="dataInicio"
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
                        className="dataFinal"
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

                {   
                    function teste() {
                        if (projeto.infoProjetos.length > 1) {
                            if (projeto.infoProjetos[0]._id !== informacao._id) {
                                return (<button 
                                    className="copiarSuperior"
                                    type="button"
                                    onClick={() => copiarDadosProjetoAnterior()}
                                >
                                    Copiar ^
                                </button>);
                            }
                        }
                    }
                }
                
            </li>
        </>
    );
};

export default GerenciarInfo;