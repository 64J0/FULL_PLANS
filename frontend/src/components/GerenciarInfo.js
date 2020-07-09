import React, { useState, useEffect } from "react";

import "./GerenciarInfo.css";

function GerenciarInfo({
  informacao,
  updateInfoProjeto,
  apagarProjeto,
  projeto,
}) {
  const [linkDesenho, setLinkDesenho] = useState(
    informacao.linkDesenho ||
      "https://github.com/gajomon/FULL_PLANS/tree/master"
  );
  const [tipoEngenharia, setTipoEngenharia] = useState(
    informacao.tipoEngenharia || ""
  );
  const [disciplinaDesenho, setDisciplinaDesenho] = useState(
    informacao.disciplinaDesenho || ""
  );
  const [revisao, setRevisao] = useState(informacao.revisao || "");
  const [numFull, setNumFull] = useState(informacao.numFull || "");
  const [numCliente, setNumCliente] = useState(informacao.numCliente || "");
  const [formato, setFormato] = useState(informacao.formato || "");
  const [descricao, setDescricao] = useState(informacao.descricao || "");
  const [projetistaDesenho, setProjetistaDesenho] = useState(
    informacao.projetistaDesenho || ""
  );
  const [verificadorDesenho, setVerificadorDesenho] = useState(
    informacao.verificadorDesenho || ""
  );
  const [dataInicio, setDataInicio] = useState(informacao.dataInicio);
  const [dataFinal, setDataFinal] = useState(informacao.dataFinal);

  // Novo estado que será utilizado no sistema, conforme pedido pelo Zé
  const [statusPorcentagem, setStatusPorcentagem] = useState(
    informacao.statusPorcentagem || 75
  );

  useEffect(() => {
    console.log(statusPorcentagem);
  }, [statusPorcentagem]);

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
        dataFinal,
        statusPorcentagem,
      });
    }

    if (
      linkDesenho !== informacao.linkDesenho ||
      tipoEngenharia !== informacao.tipoEngenharia ||
      disciplinaDesenho !== informacao.disciplinaDesenho ||
      revisao !== informacao.revisao ||
      numFull !== informacao.numFull ||
      numCliente !== informacao.numCliente ||
      formato !== informacao.formato ||
      descricao !== informacao.descricao ||
      projetistaDesenho !== informacao.projetistaDesenho ||
      verificadorDesenho !== informacao.verificadorDesenho ||
      dataInicio !== informacao.dataInicio ||
      dataFinal !== informacao.dataFinal ||
      statusPorcentagem !== informacao.statusPorcentagem
    ) {
      updateInfo();
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

    String(mes).length < 2 ? (mesSaida = "0" + mes) : (mesSaida = mes);
    String(dia).length < 2 ? (diaSaida = "0" + dia) : (diaSaida = dia);

    dataSaida =
      String(anoSaida) + "-" + String(mesSaida) + "-" + String(diaSaida);
    return String(dataSaida);
  }

  // copiarDadosProjetoAnterior()
  //
  // Essa função é responsável por adicionar o conteúdo do projeto acima às células do
  // projeto de baixo. Foi uma requisição da utilizadora do sistema.
  function copiarDadosProjetoAnterior() {
    var index = projeto.infoProjetos.findIndex((x) => x._id === informacao._id);
    if (index) {
      let descricaoInput = document.getElementsByClassName("descricao")[index],
        tipoEngenhariaInput = document.getElementsByClassName("tipoEngenharia")[
          index
        ],
        linkDesenhoInput = document.getElementsByClassName("linkDesenho")[
          index
        ],
        disciplinaDesenhoInput = document.getElementsByClassName(
          "disciplinaDesenho"
        )[index],
        revisaoInput = document.getElementsByClassName("revisao")[index],
        formatoInput = document.getElementsByClassName("formato")[index],
        numFullInput = document.getElementsByClassName("numFull")[index],
        numClienteInput = document.getElementsByClassName("numCliente")[index],
        projetistaDesenhoInput = document.getElementsByClassName(
          "projetistaDesenho"
        )[index],
        verificadorDesenhoInput = document.getElementsByClassName(
          "verificadorDesenho"
        )[index];
      descricaoInput.value = projeto.infoProjetos[index - 1].descricao;
      setDescricao(descricaoInput.value);
      tipoEngenhariaInput.value =
        projeto.infoProjetos[index - 1].tipoEngenharia;
      setTipoEngenharia(tipoEngenhariaInput.value);
      linkDesenhoInput.value = projeto.infoProjetos[index - 1].linkDesenho;
      setLinkDesenho(linkDesenhoInput.value);
      disciplinaDesenhoInput.value =
        projeto.infoProjetos[index - 1].disciplinaDesenho;
      setDisciplinaDesenho(disciplinaDesenhoInput.value);
      revisaoInput.value = projeto.infoProjetos[index - 1].revisao;
      setRevisao(revisaoInput.value);
      formatoInput.value = projeto.infoProjetos[index - 1].formato;
      setFormato(formatoInput.value);
      numFullInput.value = projeto.infoProjetos[index - 1].numFull;
      setNumFull(numFullInput.value);
      numClienteInput.value = projeto.infoProjetos[index - 1].numCliente;
      setNumCliente(numClienteInput.value);
      projetistaDesenhoInput.value =
        projeto.infoProjetos[index - 1].projetistaDesenho;
      setProjetistaDesenho(projetistaDesenhoInput.value);
      verificadorDesenhoInput.value =
        projeto.infoProjetos[index - 1].verificadorDesenho;
      setVerificadorDesenho(verificadorDesenhoInput.value);
    }
  }

  return (
    <>
      <li className="liGerenciarInfo">
        <div className="descricaoEtipoEngenharia">
          <p>Descrição:</p>
          <input
            type="text"
            className="descricao"
            name="descricao"
            value={descricao}
            onChange={(e) => {
              setDescricao(e.target.value);
            }}
          />

          <p>Engenharia:</p>
          <input
            type="text"
            className="tipoEngenharia"
            name="tipoEngenharia"
            value={tipoEngenharia}
            onChange={(e) => {
              setTipoEngenharia(e.target.value);
            }}
          />
        </div>

        <div className="linkDesenho">
          <p>Link do desenho:</p>
          <input
            type="text"
            className="linkDesenho"
            name="linkDesenho"
            value={linkDesenho}
            onChange={(e) => {
              setLinkDesenho(e.target.value);
            }}
          />
        </div>

        <div className="disciplinaErevisaoEformato">
          <p>Disciplina:</p>
          <input
            type="text"
            className="disciplinaDesenho"
            name="disciplinaDesenho"
            value={disciplinaDesenho}
            onChange={(e) => {
              setDisciplinaDesenho(e.target.value);
            }}
          />

          <p>Revisão:</p>
          <input
            type="text"
            className="revisao"
            name="revisao"
            value={revisao}
            onChange={(e) => {
              setRevisao(e.target.value);
            }}
          />

          <p>Formato:</p>
          <input
            type="text"
            className="formato"
            name="formato"
            value={formato}
            onChange={(e) => {
              setFormato(e.target.value);
            }}
          />
        </div>

        <div className="numFullEnumCliente">
          <p>Número FULL:</p>
          <input
            type="text"
            className="numFull"
            name="numFull"
            value={numFull}
            onChange={(e) => {
              setNumFull(e.target.value);
            }}
          />

          <p>Número do cliente:</p>
          <input
            type="text"
            className="numCliente"
            name="numCliente"
            value={numCliente}
            onChange={(e) => {
              setNumCliente(e.target.value);
            }}
          />
        </div>

        <div className="projetistaDesenhoEverificadorDesenho">
          <p>Projetista:</p>
          <input
            type="text"
            className="projetistaDesenho"
            name="projetistaDesenho"
            value={projetistaDesenho}
            onChange={(e) => {
              setProjetistaDesenho(e.target.value);
            }}
          />

          <p>Verificador:</p>
          <input
            type="text"
            className="verificadorDesenho"
            name="verificadorDesenho"
            value={verificadorDesenho}
            onChange={(e) => {
              setVerificadorDesenho(e.target.value);
            }}
          />
        </div>

        <div className="dataInicioEdataFinal">
          <p>Data de início:</p>
          <input
            type="date"
            className="dataInicio"
            name="dataInicio"
            value={tratarDataMostrar(dataInicio)}
            onChange={(e) => {
              setDataInicio(e.target.value);
            }}
          />

          <p>Data do término:</p>
          <input
            type="date"
            className="dataFinal"
            name="dataFinal"
            value={tratarDataMostrar(dataFinal)}
            onChange={(e) => {
              setDataFinal(e.target.value);
            }}
          />
        </div>

        <div className="porcentagemStatus">
          <p>Status do projeto:</p>
          <select
            defaultValue={statusPorcentagem}
            onChange={(event) => setStatusPorcentagem(event.target.value)}
          >
            <option value="75">EM ELABORAÇÃO - 75%</option>
            <option value="85">CHECAGEM - 85%</option>
            <option value="90">EMISSÃO - 90%</option>
            <option value="95">MEDIÇÃO - 95%</option>
            <option value="100">FINALIZADO - 100%</option>
          </select>
        </div>

        {/*
                    Funcionando

                Quando o usuário clicar neste botão deve retirar o card com o id definido neste campo, mas isso deve se suceder apenas localmente, sem que o banco de dados seja atualizado.
                A atalização do banco de dados só deve ser realizada no momento que o usuário clicar em salvar.
                */}
        <div className="buttonsGerenciarInfo">
          <button
            className="copiarSuperior"
            type="button"
            onClick={() => copiarDadosProjetoAnterior()}
          >
            Copiar ↑
          </button>
          <button
            className="deletarInfoProjeto"
            type="button"
            onClick={() => {
              var confirmacao = window.confirm("Deseja realmente apagar?");
              if (confirmacao) {
                return apagarProjeto(informacao._id);
              }
              return null;
            }}
          >
            Apagar
          </button>
        </div>
      </li>
    </>
  );
}

export default GerenciarInfo;
