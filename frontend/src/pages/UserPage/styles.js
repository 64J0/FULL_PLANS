import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h2 {
    margin-bottom: 50px;
    font-weight: bold;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .input-block {
    display: flex;
    flex-direction: space-between;
    align-items: center;
    flex: 1;

    height: 50px;
    padding: 10px 0;
    border-radius: 0;
    border-bottom: 2px dashed #ccc;
  }

  label {
    color: #333;
    font-size: 16px;
    font-weight: bold;
    padding-top: 7px;

    width: 20%;
    min-width: 200px;
    margin-left: 15px;
  }

  input[type="text"].inputArea,
  input[type="email"].inputArea {
    flex: 1;
    max-width: 700px;
    height: 30px;

    padding-left: 5px;
    margin-right: 10px;
    font-size: 14px;
    border: 1px solid #777;
    border-radius: 3px;
  }

  @media(max-width: 700px) {
    label {
      flex: 0.6;
      margin: 0;
    }

    input[type="text"].inputArea,
    input[type="email"].inputArea {
      flex: 1;
      margin: 0;
    }
  }
`;

export const DivCheckbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;

  margin: 35px 0;

  label {
    max-width: 100px;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px; 
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    align-self: flex-end;
    padding: 17px;
    margin: 40px 15px 15px 30px;
    border: none;
    text-align: center;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.5s;
    color: #ffffff;
  }

  button[type="submit"] {
    background: #1717a0;
  }

  button[type="button"] {
    background: #900000;
  }

  button[type="submit"]:hover {
    background: ${lighten(0.2, "#1717a0")};
  }

  button[type="button"]:hover {
    background: ${lighten(0.2, "#900000")}
  }
`;
