import React, { useState, useEffect } from 'react';

import { Container } from './styles';

function Buscar({ projetos, onProjetosEncontrados }) {
  const [numPedido, setNumPedido] = useState("");
  const [cliente, setCliente] = useState("");
  const [projetosEncontrados, setProjetosEncontrados] = useState([]);

  useEffect(() => {
    let numPedidoLength = numPedido.length;
    let clienteLength = cliente.length;

    // Verifica se tem alguma coisa escrita no campo de buscas
    if (!((numPedidoLength) || (clienteLength))) {
      onProjetosEncontrados(projetos);
    } else {
      onProjetosEncontrados(projetosEncontrados);
    }

  }, [numPedido, cliente, projetos, projetosEncontrados, onProjetosEncontrados]);

  useEffect(() => {
    let arrayProjetosEncontrados = [];

    function searchProjetos() {
      let numPedidoLength = numPedido.length;
      let clienteLength = cliente.length;
      let projetoNumPedidoTratado,
        projetoClienteTratado;

      // Tratamento dos dados
      projetos.map(
        (projeto) => {
          // Verifica se tem alguma coisa no campo de busca e verifica se o projeto em questão tem alguma informação no campo de numPedido
          if (numPedidoLength && projeto.numPedido) {
            // Faz um corte na string do número de pedido até a posição correspondente ao tamanho da string que está sendo encaminhada pelo usuário
            projetoNumPedidoTratado = projeto.numPedido.slice(0, numPedidoLength).trim().toUpperCase();
            // Verifica se a string cortada na instrução acima é igual ao digitado pelo usuário e guardado na variável numPedido
            if (projetoNumPedidoTratado === numPedido) {
              // Caso seja igual, faz um push, ou seja, adiciona um novo valor ao array de projetos encontrados com base no filtro definido pelo usuário
              arrayProjetosEncontrados.push(projeto);
            }
          }

          if (clienteLength && projeto.cliente) {
            projetoClienteTratado = projeto.cliente.slice(0, clienteLength).trim().toUpperCase();
            if (projetoClienteTratado === cliente) {
              arrayProjetosEncontrados.push(projeto);
            }
          }

          return null;
        }
      );

      return null;
    }

    // Atualiza o estado do array de projetos encontrados
    setProjetosEncontrados(arrayProjetosEncontrados);
    searchProjetos();
  }, [numPedido, cliente, projetos]);

  return (
    <Container>
      <fieldset>
        <legend>Buscar</legend>
        <div className="grid-container">
          <span>Cliente</span>
          <input
            type="text"
            onChange={(e) => setCliente(e.target.value.toUpperCase())}
            value={cliente}
            id="searchCliente"
          />
          <span>Número do pedido</span>
          <input
            type="text"
            onChange={(e) => setNumPedido(e.target.value.toUpperCase())}
            value={numPedido}
            id="searchNumPedido"
          />
        </div>
      </fieldset>
    </Container>
  );
}

export default Buscar;