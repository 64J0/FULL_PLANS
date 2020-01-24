import React, { useState, useEffect } from 'react';
import api from './services/api';
import CadastrarProjeto from './components/CadastrarProjeto';
//import Cabecalho from './components/Cabecalho';
import Listar from './components/Listar'

import './App.css';
import './global.css';
import Cabecalho from './components/Cabecalho';

function App() {

  useEffect(() => {
    async function loadProjetos() {
      const response = await api.get('/projetos');

      setProjetos(response.data);
    }

    loadProjetos();
  }, []);

  //=================================================================

  const [projetos, setProjetos] = useState([]);

  async function handleAddProjeto(data) {
    const response = await api.post('/projetos', data);

    setProjetos([...projetos, response.data]);
  }

  //=================================================================

  const [stringPagina, setStringPagina] = useState('');

  function decideWhatToDisplay() {

    switch (stringPagina)  {
      case 'Home': 
        return (<CadastrarProjeto onSubmit={handleAddProjeto} />);

      case 'Listar':
        return (<Listar />);

      default:
        return (<Listar />);

    }
  }

  //=================================================================

  return (
    <div id="App">
      <header className="App-header">
        <Cabecalho />
      </header>
      <main>

        {
          decideWhatToDisplay()
        }

      </main>

      <footer className="App-footer">

      </footer>
    </div>
  );
}

export default App;
