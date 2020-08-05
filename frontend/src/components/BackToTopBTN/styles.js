import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;

  position: fixed;
  bottom: 30px;
  left: 90%;

  button {
    padding-top: 10px;
    width: 55px;

    background: #0f679a;
    border: none;
    border-radius: 5px;
    transition: background-color 0.2s;
  }

  button:hover {
    transition: background-color 0.2s;
    background-color: ${lighten(0.1, '#0f679a')};

    svg {
      transition: transform 0.6s;
      transform: translate(0, -6px);
    }
  }

  svg {
    transition: transform 0.6s;
    color: yellow;
  }
`;