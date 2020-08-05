import React from "react";
import { BrowserRouter } from 'react-router-dom';

// Hooks
import AppProvider from './hooks';

// Rotas
import Routes from './routes';

// CSS
import GlobalStyles from "./styles/global";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
