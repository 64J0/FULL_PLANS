import React from 'react';

import { Container, AppContainer } from './styles';

import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

function Layout({ children }) {
  return (
    <Container>
      <Header />
      <AppContainer>
        {children}
      </AppContainer>
      <Footer />
    </Container>
  )
}

export default Layout;