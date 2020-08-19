import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;
  color: #cac7c6;

  h1 {
    text-align: center;
    font-size: 40px;
    padding-bottom: 40px;
  }

  ul {
    align-self: center;
    display: flex;
    flex-direction: row;
    max-width: 550px;

    height: 50px;
    margin-top: 5px;
    padding-bottom: 60px;
    list-style-type: none;
  }

  ul li {
    display: flex;
    flex: 1;
    height: 40px;
  }

  ul img {
    width: 40px;
  }

  ul li + li {
    margin: 0 20px 80px 20px;
    font-size: 20px;
  }

  a {
    color: #cac7c6;
    background: none;
    border: none;
    width: 100%;
    font-size: 16px;
    padding: 10px;
    min-width: 60px;
    text-decoration: none;
    border-radius: 5px;
  }

  a:hover {
    background-color: #800000;
  }
`;

export const UserSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  a.userGreetings {
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: transform 0.7s;
    padding-bottom: 10px;
    margin-left: 50px;
    width: 270px;

    svg {
      margin-right: 10px;
    }

    &:hover {
      cursor: pointer;
      transform: translateX(15px);
      text-decoration: underline;
      background-color: transparent;

      svg {
        color: #800000;
      }
    }
  }
`;

export const SignOutDiv = styled.div`
  button {
    background: transparent;
    margin-right: 50px;
    border: none;

    svg {
      color: #cac7c6;

      &:hover {
        color: #800000;
      }
    }
  }
`;