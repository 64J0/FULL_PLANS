import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  h1 {
    text-align: center;
    font-size: 40px;
    color: #cac7c6;
    padding-bottom: 40px;
  }

  ul {
    display: flex;
    flex-direction: row;

    height: 50px;
    margin-top: 15px;
    padding-bottom: 80px;
    list-style-type: none;
  }

  ul li {
    display: flex;
    flex: 1;
    height: 40px;
  }

  ul img {
    width: 40px;
    margin-left: 50px;
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