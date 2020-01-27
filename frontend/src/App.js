import React, { useState, useEffect } from 'react';
import api from './services/api';
import CadastrarProjeto from './components/CadastrarProjeto';
//import Cabecalho from './components/Cabecalho';
import Listar from './components/Listar';
import Home from './components/Home';
import Footer from './components/Footer';
import Logo from './fullE_icon.png';

import './App.css';
import './global.css';
import './components/Cabecalho.css';
//import Cabecalho from './components/Cabecalho';

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
      case 'Home' :
        return (<Home />);

      case 'Listar':
        return (<Listar props={projetos} />);

      case 'Cadastrar': 
        return (<CadastrarProjeto onSubmit={handleAddProjeto} />);

      default:
        return (<Home />);

    }
  }

  //=================================================================

  return (
    <div id="App">

      <header className="App-header cabecalho">

        <ul>
            <li><img src={Logo} alt="Ícone da empresa"/></li>
            <li><button onClick={() => setStringPagina('Home')}>Home</button></li>
            <li><button onClick={() => setStringPagina('Listar')}>Listar</button></li>
            <li><button onClick={() => setStringPagina('Cadastrar')}>Cadastrar</button></li>
        </ul>
        <h1>Planejamento FULL</h1>

      </header>

      <main className="App-main">

        {
          decideWhatToDisplay()
        }

      </main>

      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
