import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

const ProjectsManagementContext = createContext({});

const ProjectsManagementProvider = ({ children }) => {

  const arquivar = useCallback(
    async () => {
      try {
        const texto = `Deseja realmente ${
          arquivado ? "desarquivar" : "arquivar"
          } este projeto?`;

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
    []
  );

  const apagarProjeto = useCallback(
    (id) => {
      return setInfoProjetos(
        infoProjetos.filter((infoProjeto) => infoProjeto._id !== id)
      );
    },
    []
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
  },
    []
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
  }, []);

  // updateInfoProjeto()
  //
  // Essa função é responsável por atualizar os valores de infoProjetos com os dados passados
  // no body da função.
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
    []
  );


  return (
    <ProjectsManagementContext.Provider
      value={{ arquivar, apagarProjeto, salvar, adicionaNovoCampo, updateInfoProjeto }}
    >
      {children}
    </ProjectsManagementContext.Provider>
  );
}

function useProjectsManagement() {
  const context = useContext(ProjectsManagementContext);

  return context;
}

export { ProjectsManagementProvider, useProjectsManagement };