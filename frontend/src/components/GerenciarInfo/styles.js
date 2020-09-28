import styled from "styled-components";

export const Container = styled.li`
  margin-top: 30px;
  border-radius: 10px;
  padding: 5px;
  background-color: #efefef;
  box-shadow: 0 2px 6px 0;
  font-weight: bold;

  p {
    margin: 5px 0;
    color: #353839;
  }

  input {
    padding: 3px 5px;
    border: 1px solid #353839;
    color: #222;
    background: #cac7c6;
    font-weight: bold;
  }

  div.buttonsGerenciarInfo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  button {
    margin: 15px 30px;
    padding: 10px;
    width: 100px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 5px;
  }

  button.copiarSuperior[type="button"] {
    background-color: #005500;
    color: #eee;
  }

  button.copiarSuperior[type="button"]:hover {
    background-color: #590;
    color: #eee;
  }

  button.deletarInfoProjeto[type="button"] {
    background-color: #a50000;
    color: #eee;
  }

  button.deletarInfoProjeto[type="button"]:hover {
    background-color: #f00;
    color: #fff;
  }

  div {
    margin: 8px 0;
  }

  div p,
  input {
    display: inline-block;
    border-radius: 5px;
  }

  div.comments-block {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    p {
      width: 150px;
    }

    textarea {
      text-transform: uppercase;
      padding: 0.4rem;
      margin-right: 0;
      margin-left: 10px;
      flex: 1;
    }
  }

  div.descricaoEtipoEngenharia {
    display: grid;
    grid-template-columns: 150px auto 100px 100px;
    grid-gap: 10px;
  }

  div.descricaoEtipoEngenharia p,
  input,
  select {
    justify-content: center;
    text-align: start;
  }

  div.linkDesenho {
    display: grid;
    grid-template-columns: 150px auto;
    grid-gap: 10px;
  }

  div.linkDesenho p,
  input {
    justify-content: center;
    text-align: start;
  }

  div.disciplinaErevisaoEformato {
    margin: 10px 0;
    display: grid;
    grid-template-columns: 150px 1.5fr 0.3fr 0.4fr 0.3fr 100px;
    grid-gap: 10px;
    text-align: start;
  }

  div.numFullEnumCliente,
  div.projetistaDesenhoEverificadorDesenho,
  div.dataInicioEdataFinal {
    display: grid;
    grid-template-columns: 150px auto 150px auto;
    grid-gap: 10px;
    text-align: start;
  }

  div.porcentagemStatus {
    display: flex;
    flex-direction: row;
  }

  div.porcentagemStatus p {
    width: 150px;
    margin-right: 5px;
  }

  @media (max-width: 960px) {
    div.descricaoEtipoEngenharia,
    div.disciplinaErevisaoEformato,
    div.numFullEnumCliente,
    div.projetistaDesenhoEverificadorDesenho,
    div.dataInicioEdataFinal {
      display: grid;
      grid-template-columns: 150px auto;
      grid-gap: 10px;
    }
  }

`;