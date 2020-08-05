import React, { useState, useEffect, useCallback } from "react";
import GerenciarInfo from "./GerenciarInfo";
import { FiChevronsUp } from "react-icons/fi";

import "./Gerenciar.css";
import api from "../services/api";

function UpdateProjeto({ projeto, onUpdateProjeto, display }) {
  const [cliente, setCliente] = useState(projeto.cliente || "");
  const [nomeProjeto, setNomeProjeto] = useState(projeto.nomeProjeto || "");
  const [disciplinaMestre, setDisciplinaMestre] = useState(
    projeto.disciplinaMestre || ""
  );
  const [numPedido, setNumPedido] = useState(projeto.numPedido || "");
  const [responsavel, setResponsavel] = useState(projeto.responsavel || "");
  const [numGRD, setNumGRD] = useState(projeto.numGRD);

  const [arquivado, setArquivado] = useState(projeto.arquivado);
  const [status, setStatus] = useState(projeto.status || "");
  const [comentario, setComentario] = useState(projeto.comentario || "");

  const [infoProjetos, setInfoProjetos] = useState(projeto.infoProjetos);

  const [toggleNovoCampo, setToggleNovoCampo] = useState(false);

  useEffect(() => {
    setInfoProjetos(projeto.infoProjetos);
  }, [projeto]);

  // eslint-disable-next-line
  useEffect(() => {
    if (toggleNovoCampo) {
      setToggleNovoCampo(false);
      salvar(projeto._id);
    }
  });

  const atualizaEstadoArquivado = useCallback(() => {
    return setArquivado(!arquivado);
  }, [arquivado]);

  const decideWhatToDisplay = useCallback(
    (boolProvisorio) => {
      if (typeof boolProvisorio === "boolean") {
        if (!arquivado) {
          return display("Arquivados");
        } else {
          return display("Abertos");
        }
      }

      if (arquivado) {
        return display("Arquivados");
      } else {
        return display("Abertos");
      }
    },
    [arquivado, display]
  );

  const arquivar = useCallback(
    async (id) => {
      try {
        const texto = `Deseja realmente ${
          arquivado ? "desarquivar" : "arquivar"
          } este projeto?`;

        let confirmationBool = window.confirm(texto);
        if (!confirmationBool) {
          return;
        }

        atualizaEstadoArquivado();

        var body = {
          cliente,
          nomeProjeto,
          disciplinaMestre,
          numPedido,
          responsavel,
          status,
          comentario,
          infoProjetos,
          arquivado: !arquivado,
        };

        if (!projeto.arquivado) {
          body.dataArquivado = String(new Date(Date.now()));
        }

        await onUpdateProjeto(id, body);

        return decideWhatToDisplay(true);
      } catch (err) {
        console.log("Ocorreu um erro :(", err);
        return err;
      }
    },
    [
      arquivado,
      atualizaEstadoArquivado,
      cliente,
      comentario,
      decideWhatToDisplay,
      disciplinaMestre,
      infoProjetos,
      nomeProjeto,
      numPedido,
      onUpdateProjeto,
      projeto.arquivado,
      responsavel,
      status,
    ]
  );

  const apagarProjeto = useCallback(
    (id) => {
      return setInfoProjetos(
        infoProjetos.filter((infoProjeto) => infoProjeto._id !== id)
      );
    },
    [infoProjetos]
  );

  const updateInfoProjeto = useCallback(
    (id, data) => {
      var index = infoProjetos.findIndex((x) => x._id === id);

      data._id = id;
      return setInfoProjetos([
        ...infoProjetos.slice(0, index),
        data,
        ...infoProjetos.slice(index + 1),
      ]);
    },
    [infoProjetos]
  );

  const salvar = useCallback(
    async (id) => {
      var body = {
        cliente,
        nomeProjeto,
        disciplinaMestre,
        numPedido,
        responsavel,
        status,
        numGRD,
        comentario,
        infoProjetos,
        arquivado,
      };

      await onUpdateProjeto(id, body).then(() => {
        if (infoProjetos !== projeto.infoProjetos) {
          setInfoProjetos(projeto.infoProjetos);
        }
      });
    },
    [
      arquivado,
      cliente,
      comentario,
      disciplinaMestre,
      infoProjetos,
      nomeProjeto,
      numGRD,
      numPedido,
      onUpdateProjeto,
      projeto.infoProjetos,
      responsavel,
      status,
    ]
  );

  const novosCampos = useCallback(() => {
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
  }, [infoProjetos]);

  const defineTextoBotaoArquivar = useCallback(() => {
    if (projeto.arquivado) {
      return "Desarquivar";
    } else {
      return "Arquivar";
    }
  }, [projeto.arquivado]);

  async function gerarPlanilha() {
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
                <select
                  name="status"
                  id="status"
                  defaultValue={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="EM ANDAMENTO">EM ANDAMENTO</option>
                  <option value="PARALISADO PELO CLIENTE">
                    PARALISADO PELO CLIENTE
                  </option>
                  <option value="AGUARDANDO INÍCIO PELA FULL">
                    AGUARDANDO INÍCIO PELA FULL
                  </option>
                  <option value="AGUARDANDO LEVANTAMENTO DE CAMPO">
                    AGUARDANDO LEVANTAMENTO DE CAMPO
                  </option>
                  <option value="FINALIZADO">FINALIZADO</option>
                  <option value="NÚMEROS">NÚMEROS</option>
                  <option value="MEDIÇÃO">MEDIÇÃO</option>
                  <option value="APROVAÇÃO DO PROJETO">
                    APROVAÇÃO DO PROJETO
                  </option>
                </select>
              </div>

              <div className="input-block">
                <label htmlFor="comentario">Comentários</label>
                <textarea
                  name="comentario"
                  id="comentario"
                  rows="5"
                  placeholder="Digite aqui algum comentário"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                ></textarea>
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

              <div className="input-group">
                <div className="input-block">
                  <label htmlFor="numPedido">Número do pedido</label>
                  <input
                    type="text"
                    name="numPedido"
                    value={numPedido}
                    onChange={(e) => setNumPedido(e.target.value)}
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="numGRD">GRD</label>
                  <input
                    type="text"
                    name="numGRD"
                    value={numGRD}
                    onChange={(e) => setNumGRD(e.target.value)}
                  />
                </div>
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

          <div className="div-back-to-top">
            <button
              className="back-to-top"
              onClick={() => {
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
              }}
            >
              <FiChevronsUp size={30} />
            </button>
          </div>

          <div className="div-buttons">
            {/*
              Adiciona os campos de input para adicionar novas informações ao projeto que 
              está aberto
            */}
            <button
              type="button"
              className="btn-adicionarCampos"
              onClick={novosCampos}
            >
              Add Campos
            </button>

            {/*
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
              Quando o usuário clicar neste botão ele deve ser redirecionado para a página que 
              estava anteriormente, que pode ser definida com base no valor da propriedade 
              arquivado.
            */}
            <button
              type="button"
              className="btn-cancelar"
              onClick={decideWhatToDisplay}
            >
              Cancelar
            </button>

            {/*
              Quando este botão for clicado, deve abrir uma janela para o usuário confirmar
              se quer ou não arquivar o projeto realmente. 
            */}
            <button
              type="button"
              className="btn-arquivar"
              onClick={() => {
                arquivar(projeto._id);
              }}
            >
              {defineTextoBotaoArquivar()}
            </button>
          </div>

          <div className="btn-planilha">
            <button
              type="button"
              className="btn-criar-planilha"
              onClick={gerarPlanilha}
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
