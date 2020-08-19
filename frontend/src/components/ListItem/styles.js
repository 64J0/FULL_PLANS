import styled from 'styled-components';

export const Container = styled.li`
  .list-item {
  display: block;
  padding: 8px;
  margin: 25px 5px;
  border-radius: 5px;
  background: #cac7c6;
  width: 100%;
}

.list-item .grid-container {
  display: grid;
  grid-template-columns: 180px auto;
  grid-template-rows: 40px;
  align-items: center;
  width: 100%;
  cursor: default;
}

.list-item .grid-container p {
  font-weight: bold;
  height: 25px;
  padding: 3px 3px 3px 6px;
  margin: 10px 0 0 5px;
  color: #353839;
  background: #f9f9f9;
  border-radius: 3px 0;
}

.list-item .div-buttons {
  display: grid;
  grid-template-columns: 250px;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.list-item .div-buttons button.btn-editar[type="button"] {
  padding: 8px 0;
  margin: 15px 0 10px 0;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #0f679a;
  color: #fff;

  transition: background-color 0.3s;
}

.list-item .div-buttons button.btn-editar[type="button"]:hover {
  transition: background-color 0.3s;
  cursor: pointer;
  background-color: #f05e23;
  color: white;
}

div.percentageCounter {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin: 3px 10px 0 0;
  font-weight: bold;
}

div.percentageCounter p {
  background: #f9f9f9;
  padding: 5px 8px;
  border-radius: 5px;
}

`;