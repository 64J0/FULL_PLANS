import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *,
  input {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  #root {
    min-height: 100vh;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body {
    background-color: #353839;
    -webkit-font-smoothing: antialiased;
  }

  body,
  input,
  button {
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;