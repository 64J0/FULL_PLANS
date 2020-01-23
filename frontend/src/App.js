import React, { useState, useEffect } from 'react';
import api from './services/api';
import CadastrarProjeto from './components/CadastrarProjeto';

import './App.css';

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
    <div className="App">
      <header className="App-header">
        <h1 className="titulo">Planejamento FULL</h1>
      </header>
      <main>
        <h2><strong>Testando a API</strong></h2>
        <br/>
        <p>Entre com os dados nos campos abaixo:</p>
        <br/>
        <CadastrarProjeto onSubmit={handleAddProjeto} />

      </main>

      <footer className="App-footer">

      </footer>
    </div>
  );
}

export default App;
