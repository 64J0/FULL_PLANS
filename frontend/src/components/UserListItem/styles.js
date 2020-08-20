import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid #666;
  border-radius: 0.2rem;

  p {
    flex: 1;
  }

  p.selectElement {
    flex: 0.5;
  }

  && button {
    height: 100%;
    margin: 0 0.5rem;
    padding: 0;
    background-color: #fff;
  }

  svg {
    color: #1717a0;
  }
`