import React, { useState, useEffect } from "react";
import GerenciarInfo from "./GerenciarInfo";

import "./Gerenciar.css";
import api from "../services/api";

// projeto === projetoUpdate
function UpdateProjeto({ projeto, onUpdateProjeto, display }) {
  const [cliente, setCliente] = useState(projeto.cliente || "");
  const [nomeProjeto, setNomeProjeto] = useState(projeto.nomeProjeto || "");
  const [disciplinaMestre, setDisciplinaMestre] = useState(
    projeto.disciplinaMestre || ""
  );
  const [numPedido, setNumPedido] = useState(projeto.numPedido || "");
  const [responsavel, setResponsavel] = useState(projeto.responsavel || "");

  const [arquivado, setArquivado] = useState(projeto.arquivado);
  const [status, setStatus] = useState(projeto.status || "");

  const [infoProjetos, setInfoProjetos] = useState(projeto.infoProjetos);

  const [toggleNovoCampo, setToggleNovoCampo] = useState(false);

  // Este hook useEffect é responsável por setar o valor da propriedade infoProjetos
  // toda vez que o valor de projeto mudar.
  useEffect(() => {
    setInfoProjetos(projeto.infoProjetos);
  }, [projeto]);

  // Este trecho de código é sempre executado quando algum estado é alterado, porém
  // sua função só é executada quando o botão para criar um novo campo é apertado,
  // pois isso muda o estado de toggleNovoCampo. Essa implementação foi necessária para
  // garantir que quando um novo campo for inserido ele terá um id e portanto será
  // possível fazer operações neste.
  //
  // eslint-disable-next-line
  useEffect(() => {
    if (toggleNovoCampo) {
      setToggleNovoCampo(false);
      salvar(projeto._id);
    }
  });

  // Esse trecho de código é responsável por arquivar um projeto quando o usuário clicar no botão
  // de arquivar. Além disso, após setar o novo estado o usuário é redirecionado para outra aba
  // da aplicação, onde são mostrados todos os projetos arquivados.
  useEffect(() => {
    async function arquivar(id) {
      if (arquivado !== projeto.arquivado) {
        new Promise((resolve, reject) => {
          const texto = "Descrição do status:";
          let novoStatus = window.prompt(texto, "");
          if (novoStatus) {
            novoStatus = novoStatus.toUpperCase();
          }
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
              arquivado,
            };
            if (!projeto.arquivado) {
              body.dataArquivado = String(new Date(Date.now()));
            }
            return body;
          })
          .then((body) => {
            onUpdateProjeto(id, body);
          })
          .then(() => {
            decideWhatToDisplay();
          })
          .catch((err) => {
            console.log("Ocorreu um erro :(", err);
            return err;
          });
      }
    }

    arquivar(projeto._id);
    // eslint-disable-next-line
  }, [arquivado]);

  // decideWhatToDisplay()
  //
  // Essa função é responsável por mudar a aba do usuário no sistema, dependendo do valor
  // armazenado na propriedade arquivado do projeto.
  function decideWhatToDisplay() {
    if (arquivado) {
      display("Arquivados");
    } else {
      display("Abertos");
    }
  }

  // apagarProjeto()
  //
  // Essa função é responsável por editar os valores de infoProjetos, mais especificamente,
  // ela irá retirar do conjunto de valores de infoProjetos o valor cujo id foi passado na
  // chamada da função.
  function apagarProjeto(id) {
    return setInfoProjetos(
      infoProjetos.filter((infoProjeto) => infoProjeto._id !== id)
    );
  }

  // updateInfoProjeto()
  //
  // Essa função é responsável por atualizar os valores de infoProjetos com os dados passados
  // no body da função.
  function updateInfoProjeto(id, data) {
    var index = infoProjetos.findIndex((x) => x._id === id);

    data._id = id;
    return setInfoProjetos([
      ...infoProjetos.slice(0, index),
      data,
      ...infoProjetos.slice(index + 1),
    ]);
  }

  // salvar()
  //
  // Essa função assíncrona é responsável por salvar os dados de um infoProjetos no banco de dados
  // com os valores salvos nos estados desse componente.
  async function salvar(id) {
    var body = {
      cliente,
      nomeProjeto,
      disciplinaMestre,
      numPedido,
      responsavel,
      status,
      infoProjetos,
      arquivado,
    };

    await onUpdateProjeto(id, body).then(() => {
      if (infoProjetos !== projeto.infoProjetos) {
        setInfoProjetos(projeto.infoProjetos);
      }
    });
  }

  // novosCampos()
  //
  // Essa função é responsável por criar os novos campos de um infoProjeto novo.
  function novosCampos() {
    let novaInfoProjeto = {
      linkDesenho: "",
      disciplinaDesenho: "",
      revisao: "",
      numFull: "",
      numCliente: "",
      formato: "",
      descricao: "",
      projetistaDesenho: "",
      verificadorDesenho: "",
      dataInicio: "01-01-2020",
      dataFinal: "02-01-2020",
    };
    setInfoProjetos([...infoProjetos, novaInfoProjeto]);
    setToggleNovoCampo(true);
  }

  // defineTextoBotaoArquivar()
  //
  // Essa função é responsável por especificar qual o texto que será mostrado para o usuário
  // no botão de arquivar ou desarquivar com base na propriedade arquivado do projeto.
  function defineTextoBotaoArquivar() {
    if (projeto.arquivado) {
      return "Desarquivar";
    } else {
      return "Arquivar";
    }
  }

  // gerarPlanilha()
  //
  // Essa função é responsável por chamar a rota da API que cria a planilha Excel
  // com os dados do projeto em questão. Para tratar os dados que são retornados pela
  // API é usada uma função compiada de um pacote do npm.
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
    var jsFileDownload = function (data, filename, mime, bom) {
      var blobData = typeof bom !== "undefined" ? [bom, data] : [data];
      var blob = new Blob(blobData, {
        type: mime || "application/octet-stream",
      });
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        // IE workaround for "HTML7007: One or more blob URLs were
        // revoked by closing the blob for which they were created.
        // These URLs will no longer resolve as the data backing
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
      } else {
        var blobURL = (window.URL
          ? window.URL
          : window.webkitURL
        ).createObjectURL(blob);
        var tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", filename);

        // Safari thinks _blank anchor are pop ups. We only want to set _blank
        // target if the browser does not support the HTML5 download attribute.
        // This allows you to download files in desktop safari if pop up blocking
        // is enabled.
        if (typeof tempLink.download === "undefined") {
          tempLink.setAttribute("target", "_blank");
        }

        document.body.appendChild(tempLink);
        tempLink.click();

        // Fixes "webkit blob resource error 1"
        setTimeout(function () {
          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(blobURL);
        }, 0);
      }
    };

    await api
      .get(`/excel/${projeto._id}`, { responseType: "arraybuffer" })
      .then((response) => {
        var fileName = String(`GRD_${projeto.numGRD}.xlsx`);
        jsFileDownload(response.data, fileName);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="update-item">
        <div id={projeto._id} className="grid-container">
          <form className="update-form">
            <div className="inputFields">
              <div className="input-block">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  name="status"
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="cliente">Cliente</label>
                <input
                  type="text"
                  name="cliente"
                  required
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="nomeProjeto">Nome do projeto</label>
                <input
                  type="text"
                  name="nomeProjeto"
                  value={nomeProjeto}
                  onChange={(e) => setNomeProjeto(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="disciplinaMestre">Disciplina mestre</label>
                <input
                  type="text"
                  name="disciplinaMestre"
                  value={disciplinaMestre}
                  onChange={(e) => setDisciplinaMestre(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="numPedido">Número do pedido</label>
                <input
                  type="text"
                  name="numPedido"
                  value={numPedido}
                  onChange={(e) => setNumPedido(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="responsavel">Responsável</label>
                <input
                  type="text"
                  name="responsavel"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                />
              </div>
            </div>

            <ol>
              {infoProjetos.map((informacao) => (
                <GerenciarInfo
                  key={String(informacao._id)}
                  informacao={informacao}
                  updateInfoProjeto={updateInfoProjeto}
                  apagarProjeto={apagarProjeto}
                  projeto={projeto}
                />
              ))}
            </ol>
          </form>

          {/* ================================================================================================ */}

          <div className="div-buttons">
            {/*
                        Funcionando 
                        Adiciona os campos de input para adicionar novas informações ao projeto que 
                        está aberto
                    */}
            <button
              type="button"
              className="btn-adicionarCampos"
              onClick={() => {
                novosCampos();
              }}
            >
              Add Campos
            </button>

            {/* 
                        Funcionando
                        Quando o usuário clicar neste botão o projeto ou infoProjeto em questão será salvo
                        no banco de dados
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

            {/* 
                        Funcionando 
                        Quando o usuário clicar neste botão ele deve ser redirecionado para a página que 
                        estava anteriormente, que pode ser definida com base no valor da propriedade 
                        arquivado.
                    */}
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => {
                decideWhatToDisplay();
              }}
            >
              Cancelar
            </button>

            {/*
                        Funcionando
                        Quando este botão for clicado, deve abrir uma janela pop-up para que o usuário 
                        possa atualizar o valor do estado de status. 
                     */}
            <button
              type="button"
              className="btn-arquivar"
              onClick={() => {
                setArquivado(!projeto.arquivado);
              }}
            >
              {defineTextoBotaoArquivar()}
            </button>
          </div>

          <div className="btn-planilha">
            <button
              type="button"
              className="btn-criar-planilha"
              onClick={() => {
                gerarPlanilha();
              }}
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
