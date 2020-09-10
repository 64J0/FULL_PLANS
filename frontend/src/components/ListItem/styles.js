import styled from "styled-components";

export const Container = styled.li`
  display: block;
  padding: 8px;
  margin: 25px 5px;
  border-radius: 4px;
  background: #cac7c6;
  width: 100%;

  .div-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .div-buttons button.btn-editar[type="button"] {
    width: 12rem;
    padding: 8px 0;
    margin: 16px 0;

    font-weight: bold;
    font-size: 1.2rem;

    border: none;
    border-radius: 8px;
    background-color: #0f679a;
    color: #fff;

    transition: background-color 0.3s;
  }

  .div-buttons button.btn-editar[type="button"]:hover {
    transition: background-color 0.3s;
    cursor: pointer;
    background-color: #f05e23;
    color: white;
  }
`;

export const PercentageCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin: 3px 10px 8px 0;
  font-weight: bold;

  p {
    background: #f9f9f9;
    padding: 5px 8px;
    border-radius: 5px;
  }
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: default;

  div {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: left;
    width: 100%;
  }

  span {
    width: 20%;
    min-width: 10rem;
    text-align: right;
  }

  p {
    flex: 1;
    margin: 8px 0 0 8px;
  }

  p, span {
    padding: 4px;
    font-weight: bold;
    color: #353839;
    background: #f9f9f9;
    border-radius: 4px 0;
  }
`;