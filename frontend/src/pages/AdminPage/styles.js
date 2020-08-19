import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    padding: 17px;
    margin: 40px 15px 15px 30px;
    border: none;
    text-align: center;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.5s;
    color: #fff;
  }

  .principal {
    background: #1717a0;
  }

  .secondary {
    background: #900000;
  }

  .principal:hover {
    background: ${lighten(0.2, "#1717a0")};
  }

  .secondary:hover {
    background: ${lighten(0.2, "#900000")};
  }
`;

export const UserList = styled.ul`
  list-style: none;
  width: 100%;

  .userListItem {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid #666;
    border-radius: 0.2rem;
  }

  && button {
    height: 100%;
    margin: 0 0.5rem 0 0;
    padding: 0;
    background-color: #fff;
  }

  svg {
    color: #1717a0;
    transition: transform 2s;
  }

  && button:hover {
    svg {
      transform: rotateZ(360deg);
    }
  }
`;

export const ButtonAddUser = styled.button`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;

    color: #1717a0;
    border: 2px solid #1717a0;
    font-weight: bold;

    svg {
      margin-right: 1rem;
    }
  }

  &&:hover {
    background-color: ${lighten(0.55, "#1717a0")};
  }
`;