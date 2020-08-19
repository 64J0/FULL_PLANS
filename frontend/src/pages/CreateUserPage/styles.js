import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-weight: bold;

  form {
    display: flex;
    flex-direction: column;

    margin-top: 2rem;
    width: 100%;
    max-width: 700px;
  }

  button[type="submit"] {
    border: none;
    border-radius: 4px;

    margin-top: 3rem;
    padding: 17px;
    width: 200px;

    align-self: flex-end;
    font-size: 16px;
    background: #1717a0;
    color: #fff;
    transition: background 0.5s;
  }

  button[type="submit"]:hover {
    background: ${lighten(0.2, "#1717a0")};
  }
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 10px 0;

  label {
    width: 20%;
    min-width: 150px;
    margin-left: 15px;
  }

  input {
    flex: 1;
    max-width: 700px;
    height: 30px;

    border: 1px solid #777;
    border-radius: 3px;
    margin-right: 10px;
    padding-left: 5px;
    font-size: 14px;
  }

  select {
    height: 30px;
    border: 1px solid #777;
    border-radius: 3px;
    margin-right: 10px;
    padding-left: 5px;
    font-size: 14px;
  }
`;