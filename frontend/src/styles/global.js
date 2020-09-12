import { createGlobalStyle } from "styled-components";

import { primary } from "./colorThemes";

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
    background-color: ${primary[800]};
    -webkit-font-smoothing: antialiased;
  }

  body,
  input,
  button {
    font-family: 'Lato', 'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;