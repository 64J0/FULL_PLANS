import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: row;
  text-align: center;
  border: 1px solid #777;
  border-radius: 3px;
  margin-right: 10px;

  input.passwordInput {
    flex: 1;
    height: 30px;
    border: none;

    font-size: 14px;
    margin: 0;
    padding-left: 5px;
  }

  button {
    background-color: transparent;
    border: none;
    margin-right: 10px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;