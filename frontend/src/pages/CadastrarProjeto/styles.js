import styled from 'styled-components';

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
    justify-content: center;
    flex: 1;

    height: 40px;
    padding: 10px 0;
    margin: 0.2rem;
  }

  label {
    color: #333;
    font-size: 16px;
    font-weight: bold;
    padding-top: 7px;

    width: 20%;
    min-width: 150px;
    margin-left: 15px;
    text-align: right;
  }

  input {
    flex: 1;
    max-width: 500px;
    height: 30px;

    padding-left: 5px;
    margin-right: 10px;
    margin-left: 15px;
    font-size: 14px;
    border: 1px solid #777;
    border-radius: 3px;
  }

  button[type="submit"] {
    align-self: flex-end;
    padding: 17px;
    margin: 40px 15px 15px 30px;
    border: none;
    background: rgb(23, 23, 160);
    color: #ffffff;
    text-align: center;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.5s;
  }

  button[type="submit"]:hover {
    background: #4d44d8;
  }

  @media(max-width: 700px) {
    label {
      flex: 0.6;
    }

    input {
      flex: 1;
    }

    button[type="submit"] {
      align-self: center;
    }
  }
`;
