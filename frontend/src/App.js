import React, { useState, useEffect } from 'react';
import api from './services/api';
import CadastrarProjeto from './components/CadastrarProjeto';
import Cabecalho from './components/Cabecalho';

import './App.css';
import './global.css';

function App() {

  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    async function loadProjetos() {
      const response = await api.get('/projetos');

      setProjetos(response.data);
    }

    loadProjetos();
  }, []);

  async function handleAddProjeto(data) {
    const response = await api.post('/projetos', data);

    setProjetos([...projetos, response.data]);
  }

  return (
    <div id="App">
      <header className="App-header">
        <Cabecalho />
      </header>
      <main>

        <CadastrarProjeto onSubmit={handleAddProjeto} />

      </main>

      <footer className="App-footer">

      </footer>
    </div>
  );
}

export default App;
