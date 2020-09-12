import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 8px;
  margin: 8px;
  border-radius: 4px;
  background-color: #cac7c6;
  color: #353839;

  .div-buttons {
    margin: 24px 0;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    justify-content: center;
    text-align: center;
  }

  .div-buttons button {
    cursor: pointer;
    padding: 8px;
    margin: 12px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
  }

  .div-buttons button.btn-adicionarCampos {
    border: 2px solid #2e8b57;
    background-color: rgba(255, 255, 255, 0.55);
    color: #2e8b57;
  }

  .div-buttons button.btn-salvar {
    border: 2px solid #0f679a;
    background-color: rgba(255, 255, 255, 0.55);
    color: #0f679a;
  }

  .div-buttons button.btn-cancelar {
    border: 2px solid #800;
    background-color: rgba(255, 255, 255, 0.55);
    color: #800;
  }

  .div-buttons button.btn-arquivar {
    border: 2px solid #705714;
    background-color: rgba(255, 255, 255, 0.55);
    color: #705714;
  }

  .div-buttons button.btn-adicionarCampos:hover,
  .div-buttons button.btn-salvar:hover,
  .div-buttons button.btn-cancelar:hover,
  .div-buttons button.btn-arquivar:hover {
    background-color: #ccc;
    border-color: black;
    color: black;
  }

  div.btn-downloads {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  div.btn-downloads button {
    font-weight: bold;
    width: 200px;
    padding: 8px 0;
    margin: 12px;
    font-size: 16px;
    color: #eee;

    border: none;
    border-radius: 8px;
  }

  div.btn-downloads .btn-criar-planilha {
    background-color: #2e8b57;
  }

  div.btn-downloads .btn-criar-relatorio {
    background-color: #0f679a;
  }

  div.btn-downloads button:hover {
    background-color: rgba(126, 252, 0, 0.541);
    color: #444;
  }
`;

// %%%%%%%%%%%%%%%%%%%%%%%%%
// InputBlock
export const InputBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;

  label {
    min-width: 170px;
    font-weight: bold;
    padding: 4px 4px 4px 8px;
    margin: 8px 0 0 8px;
    color: #353839;
    background: none;
  }

  input,
  select,
  textarea {
    flex: 1;
    font-size: 14px;
    border: 1px solid black;
    font-weight: bold;
    padding: 4px 4px 4px 8px;
    margin: 8px 24px 0 4px;
    color: #353839;
    border-radius: 4px;
    background: rgb(245, 245, 245);
  }
`;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// InputGroup
export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  div {
    width: 70%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  label {
    min-width: 170px;
    font-weight: bold;
    padding: 4px 4px 4px 8px;
    margin: 8px 0 0 8px;
    color: #353839;
    background: none;
  }

  input {
    flex: 1;
    font-size: 14px;
    border: 1px solid black;
    font-weight: bold;
    padding: 4px 4px 4px 8px;
    margin: 8px 24px 0 4px;
    color: #353839;
    border-radius: 4px;
    background: rgb(245, 245, 245);
  }

  div + div {
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 30%;

    label {
      min-width: 50px;
      width: 50px;
      margin: 8px 0 0 0;
      padding: 0;
    }

    input {
      width: 100%;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;

    div {
      width: 100%;
    }

    div + div {
      width: 100%;

      label {
        width: 170px;
        padding: 3px 3px 3px 6px;
        margin: 5px 0 0 5px;
      }
    }

    input {
      flex: 1;
      font-size: 14px;
      border: 1px solid black;
      font-weight: bold;
      padding: 3px 3px 3px 6px;
      margin: 7px 20px 0 5px;
      color: #353839;
      border-radius: 5px;
      background: rgb(245, 245, 245);
    }
  }
`;