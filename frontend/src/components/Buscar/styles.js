import styled from 'styled-components';

export const Container = styled.div`
  fieldset {
    width: 100%;
    display: block;
    margin: 0 5px 15px 5px;
    padding: 10px;
    border-radius: 10px 0;
  }

  fieldset legend {
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    color: #353839;
  }

  fieldset div.grid-container {
    display: grid;
    grid-template-columns: 180px 50%;
    align-items: baseline;
    justify-content: center;
  }

  fieldset div.grid-container span,
  input {
    margin-top: 8px;
    font-size: 16px;
    color: #353839;
    font-weight: 550;
  }

  fieldset div.grid-container input {
    border: 1px solid #757a7c;
    border-radius: 3px;
    height: 25px;
    margin: 5px;
    padding: 5px;
  }
`;