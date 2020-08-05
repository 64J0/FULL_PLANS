import React from 'react';
import { FaHandPointUp } from "react-icons/fa";

import { Container } from './styles';

export default function BotaoBackToTop() {
  return (
    <Container>
      <button
        className="back-to-top"
        onClick={() => {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }}
      >
        <FaHandPointUp size={30} />
      </button>
    </Container>
  )
}