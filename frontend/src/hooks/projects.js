import React, { createContext, useCallback, useState, useMemo, useEffect, useContext } from "react";

import api from "../services/api";
import { useAuth } from "./auth";

const ProjectsContext = createContext({});

const ProjectsProvider = ({ children }) => {
  const { loginData } = useAuth();

  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    if (loginData.auth) {
      api.get("/projetos").then(response => {
        return setProjetos(response.data);
      });
    }
  }, [loginData]);

  const projetosAbertos = useMemo(() => {
    let arrayProjetosAbertos = [];

    if (!projetos.length) {
      return arrayProjetosAbertos;
    }

    projetos.map(p => {
      if (!p.arquivado) {
        return arrayProjetosAbertos.push(p);
      }
      return undefined;
    });

    return arrayProjetosAbertos;
  }, [projetos]);

  const projetosArquivados = useMemo(() => {
    let arrayProjetosArquivados = [];

    if (!projetos.length) {
      return arrayProjetosArquivados;
    }

    projetos.map(p => {
      if (p.arquivado) {
        return arrayProjetosArquivados.push(p);
      }
      return undefined;
    });

    return arrayProjetosArquivados;
  }, [projetos]);

  const biggerNumGRD = useMemo(() => {
    let maiorNumGRD = 0;
    for (let aux = 0, len = projetos.length; aux < len; aux++) {
      if (projetos[aux].numGRD && projetos[aux].numGRD >= maiorNumGRD) {
        maiorNumGRD = projetos[aux].numGRD + 1;
      }
    }
    return maiorNumGRD;
  }, [projetos]);

  const handleAddProjeto = useCallback(async (data) => {
    data.status = "EM ANDAMENTO";
    data.numGRD = biggerNumGRD;
    await api
      .post("/projetos", data)
      .then((response) => {
        setProjetos([...projetos, response.data]);
      })
      .catch((error) => console.error(error));
  }, [biggerNumGRD, projetos]);

  const handleUpdateProjeto = useCallback(async (id, body) => {
    if (!id) return undefined;
    let returnStatement = null;

    const index = projetos.findIndex((x) => String(x._id) === String(id));

    if (isNaN(index)) throw new Error("Não foi encontrado o ID do projeto");

    await api
      .put(`/projetos/${id}`, body)
      .then((response) => {
        returnStatement = response;

        const projetosAtualizados = [
          ...projetos.slice(0, index),
          response.data,
          ...projetos.slice(index + 1),
        ];
        setProjetos(projetosAtualizados);
      })
      .catch((error) => {
        console.error(error);
      });

    return returnStatement;
  }, [projetos]);

  return (
    <ProjectsContext.Provider
      value={{ projetos, projetosAbertos, projetosArquivados, biggerNumGRD, handleAddProjeto, setProjetos, handleUpdateProjeto }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

function useProjects() {
  const context = useContext(ProjectsContext);

  return context;
}

export { ProjectsProvider, useProjects };