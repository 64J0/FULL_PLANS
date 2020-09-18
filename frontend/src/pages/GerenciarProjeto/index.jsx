import React, { useState, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { useProjects } from "../../hooks/projects";

import gerarPlanilha from "../../utils/gerarPlanilha";
import gerarRelatorio from "../../utils/gerarRelatorio";

import BackToTopBTN from "../../components/BackToTopBTN";
import GerenciarInfo from "../../components/GerenciarInfo";
import Modal from "../../components/Modal";

import { Container, InputBlock, InputGroup } from "./styles";

function UpdateProjeto() {
  const { handleUpdateProjeto } = useProjects();
  const history = useHistory();
  const location = useLocation();
  const [projeto, setProjeto] = useState(location.state.projeto);

  const [modalOpen, setModalOpen] = useState(false);

  const [cliente, setCliente] = useState(projeto && projeto.cliente);
  const [nomeProjeto, setNomeProjeto] = useState(projeto && projeto.nomeProjeto);
  const [disciplinaMestre, setDisciplinaMestre] = useState(
    projeto && projeto.disciplinaMestre
  );
  const [numPedido, setNumPedido] = useState(projeto && projeto.numPedido);
  const [responsavel, setResponsavel] = useState(projeto && projeto.responsavel);
  const [numGRD, setNumGRD] = useState(projeto && projeto.numGRD);
  const [arquivado, setArquivado] = useState(projeto && projeto.arquivado);
  const [status, setStatus] = useState(projeto && projeto.status);
  const [comentario, setComentario] = useState(projeto && projeto.comentario);

  const [infoProjetos, setInfoProjetos] = useState(projeto && projeto.infoProjetos);

  const toggleArquivado = useCallback(() => {
    setArquivado(!arquivado);
  }, [arquivado]);

  const defineParaOndeRetornar = useCallback(
    () => {
      if (arquivado) {
        return history.push("/arquivados");
      } else {
        return history.push("/abertos");
      }
    },
    [arquivado, history]
  );

  const arquivar = useCallback(
    async () => {
      try {
        const texto = `Deseja realmente ${arquivado ? "desarquivar" : "arquivar"} este projeto?`;

        let confirmationBool = window.confirm(texto);
        if (!confirmationBool) {
          return;
        }

        toggleArquivado();

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
        } else {
          body.dataArquivado = null;
        }

        await handleUpdateProjeto(projeto._id, body);

        return defineParaOndeRetornar();
      } catch (err) {
        console.log("Ocorreu um erro :(", err);
        return err;
      }
    },
    [arquivado, toggleArquivado, cliente, nomeProjeto, disciplinaMestre, numPedido, responsavel, status, comentario, infoProjetos, projeto.arquivado, projeto._id, handleUpdateProjeto, defineParaOndeRetornar]
  );

  const apagarProjeto = useCallback(
    (id) => {
      return setInfoProjetos(
        infoProjetos.filter((infoProjeto) => infoProjeto._id !== id)
      );
    },
    [infoProjetos]
  );

  const salvar = useCallback(async () => {
    const body = {
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

    await handleUpdateProjeto(projeto._id, body)
      .then((response) => {
        console.log(response.data);
        setProjeto(response.data);
      });
  }, [cliente, nomeProjeto, disciplinaMestre, numPedido, responsavel, status, numGRD, comentario, infoProjetos, arquivado, handleUpdateProjeto, projeto._id]
  );

  const adicionaNovoCampo = useCallback(async () => {
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

    await handleUpdateProjeto(projeto._id,
      Object.assign(projeto,
        { infoProjetos: [...infoProjetos, novaInfoProjeto] }
      )
    )
      .then((response) => {
        setProjeto(response.data);
        setInfoProjetos(response.data.infoProjetos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [handleUpdateProjeto, infoProjetos, projeto]);

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

  return (
    <Container>
      <Modal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
      />
      <div id={projeto._id} className="grid-container">
        <form className="update-form">
          <InputBlock>
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
          </InputBlock>

          <InputBlock>
            <label htmlFor="comentario">Comentários</label>
            <textarea
              name="comentario"
              id="comentario"
              rows="5"
              placeholder="Digite aqui algum comentário"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            ></textarea>
          </InputBlock>

          <InputBlock>
            <label htmlFor="cliente">Cliente</label>
            <input
              type="text"
              name="cliente"
              required
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </InputBlock>

          <InputBlock>
            <label htmlFor="nomeProjeto">Nome do projeto</label>
            <input
              type="text"
              name="nomeProjeto"
              value={nomeProjeto}
              onChange={(e) => setNomeProjeto(e.target.value)}
            />
          </InputBlock>

          <InputBlock>
            <label htmlFor="disciplinaMestre">Disciplina mestre</label>
            <input
              type="text"
              name="disciplinaMestre"
              value={disciplinaMestre}
              onChange={(e) => setDisciplinaMestre(e.target.value)}
            />
          </InputBlock>

          <InputGroup>
            <div>
              <label htmlFor="numPedido">Número do pedido</label>
              <input
                type="text"
                name="numPedido"
                value={numPedido}
                onChange={(e) => setNumPedido(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="numGRD">GRD</label>
              <input
                type="text"
                name="numGRD"
                value={numGRD}
                onChange={(e) => setNumGRD(e.target.value)}
              />
            </div>
          </InputGroup>

          <InputBlock>
            <label htmlFor="responsavel">Responsável</label>
            <input
              type="text"
              name="responsavel"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
            />
          </InputBlock>

          <ol>
            {infoProjetos && infoProjetos.map((informacao, index) => {
              return (
                <GerenciarInfo
                  key={String(informacao._id)}
                  showCopiar={!!index}
                  informacao={informacao}
                  apagarProjeto={apagarProjeto}
                  updateInfoProjeto={updateInfoProjeto}
                  projeto={projeto}
                />
              );
            })}
          </ol>
        </form>

        {/* ================================================================================================ */}

        <BackToTopBTN />

        <div className="div-buttons">
          <button
            type="button"
            className="btn-adicionarCampos"
            onClick={async () => await adicionaNovoCampo()}
          >
            Novo Campo
          </button>

          <button
            type="button"
            className="btn-salvar"
            onClick={async () => await salvar()}
          >
            Salvar
          </button>

          <button
            type="button"
            className="btn-cancelar"
            onClick={defineParaOndeRetornar}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn-arquivar"
            onClick={async () => await arquivar()}
          >
            {
              projeto.arquivado ? "Desarquivar" : "Arquivar"
            }
          </button>
        </div>

        <div className="btn-downloads">
          <button
            type="button"
            className="btn-criar-planilha"
            onClick={async () => {
              setModalOpen(true);
              await gerarPlanilha(projeto)
                .then(() => {
                  setModalOpen(false);
                });
            }}
          >
            Planilha!
          </button>

          <button
            type="button"
            className="btn-criar-relatorio"
            onClick={async () => {
              setModalOpen(true);
              await gerarRelatorio(projeto)
                .then(() => {
                  setModalOpen(false);
                });
            }}
          >
            Relatório!
          </button>
        </div>
      </div>
    </Container>
  );
}

export default UpdateProjeto;
