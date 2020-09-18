import styled from "styled-components";

import { fontColor, primary, analogous2 } from "../../styles/colorThemes";

export const Container = styled.div`
  align-self: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 500px;
  height: 500px;
  padding: 20px;
  border-radius: 16px 0;

  background-color: #fff;
  color: ${fontColor.text};

  img {
    width: 90px;
    margin: 0 auto;
  }

  form {
    width: 90%;
  }

  fieldset {
    width: 100%;
    border: none;
  }

  fieldset legend {
    padding: 20px 0 10px 0;
    margin-bottom: 1.5rem;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
  }

  fieldset button {
    width: 100%;
    margin-top: 1rem;
    padding: 12px 0;
    
    font-weight: bold;
    font-size: 1.2rem;
    justify-content: center;

    border: none;
    background: ${analogous2[900]};
    border-radius: 4px;
    color: #fafafa;
    transition: background 0.5s;
  }

  fieldset button:hover {
    background: ${analogous2[600]};
  }
`;

export const InputCustomizado = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 16px 0;
  border-radius: 4px;
  border: 1px solid ${primary[900]};

  span {
    display: flex;
    align-items: center;
    width: 20px;
    margin: 0 10px;
  }

  input {
    flex: 1;
    padding: 5px;
    background: transparent;
    border: none;
    border-left: 1px solid ${primary[900]};
    border-radius: 0;
  }
`;