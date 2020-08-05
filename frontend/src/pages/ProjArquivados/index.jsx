import React, { useState, useEffect } from "react";
import ListItem from "../../components/ListItem";
import Buscar from "../../components/Buscar";
import PaginacaoBtn from "../../components/Paginacao";

import { Container } from "./styles";

import { useProjects } from '../../hooks/projects';

function Arquivados() {
  const { projetosArquivados: props, setProjetoUpdate: setProjeto } = useProjects();

  const [projetosArquivados, setProjetosArquivados] = useState([]);
  const [projetosEncontradosNaBusca, setProjetosEncontradosNaBusca] = useState(
    []
  );

  const [page, setPage] = useState(0);
  const [arrayPaginas, setArrayPaginas] = useState([]);
  const [projetosDaPagina, setProjetosDaPagina] = useState([]);

  useEffect(() => {
    return setProjetosDaPagina(projetosEncontradosNaBusca);
  }, [projetosEncontradosNaBusca]);

  // Variável constante que define quantos projetos aparecerão
  // em cada página
  const qntdProjetosPorPagina = 10;

  useEffect(() => {
    if (typeof page === "number") {
      const primeiroIndice = page * qntdProjetosPorPagina;
      const segundoIndice = (page + 1) * qntdProjetosPorPagina;
      return setProjetosArquivados(
        projetosDaPagina.slice(primeiroIndice, segundoIndice)
      );
    }
  }, [page, projetosDaPagina, projetosEncontradosNaBusca]);

  useEffect(() => {
    const quantidadeDePaginas = Math.ceil(
      projetosEncontradosNaBusca.length / qntdProjetosPorPagina
    );
    const arrayNumerico = [];
    for (let cont = 0; cont < quantidadeDePaginas; cont++) {
      arrayNumerico.push(cont);
    }
    setArrayPaginas(arrayNumerico);
  }, [projetosEncontradosNaBusca.length]);

  function defineProjetosEncontrados(projetos) {
    return setProjetosEncontradosNaBusca(projetos.reverse());
  }

  return (
    <Container>
      <h2>Projetos Arquivados</h2>
      <Buscar
        projetos={props}
        onProjetosEncontrados={defineProjetosEncontrados}
      />
      <ul>
        {projetosArquivados.map((projeto) => (
          <ListItem
            key={String(projeto._id)}
            projeto={projeto}
            setProjeto={setProjeto}
          />
        ))}
      </ul>
      <div id="btnPaginacao">
        {arrayPaginas.map((numPagina, index) => {
          if (index === page) {
            return (
              <PaginacaoBtn
                key={numPagina}
                prop={numPagina}
                setPage={setPage}
                page={page}
              />
            );
          }
          return (
            <PaginacaoBtn key={numPagina} prop={numPagina} setPage={setPage} />
          );
        })}
      </div>
    </Container>
  );
}

export default Arquivados;
