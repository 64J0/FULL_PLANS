import React, { useState, useEffect } from 'react';

import api from './services/api';
import CadastrarProjeto from './components/CadastrarProjeto';
import Cabecalho from './components/Cabecalho';
import Listar from './components/Listar';
import Arquivados from './components/Arquivados';
import Home from './components/Home';
import Footer from './components/Footer';
//import Logo from './fullE_icon.png';

import './App.css';
import './global.css';
import './components/Cabecalho.css';

function App() {

  const [projetos, setProjetos] = useState([]);
  const [projetosArquivados, setProjetosArquivados] = useState([]);
  const [projetosAbertos, setProjetosAbertos] = useState([]);

  useEffect(() => {

    async function loadProjetos() {

      const response = await api.get('/projetos');
      setProjetos(response.data);
      
    }

    loadProjetos();

  }, []);

  useEffect(() => {

    let arrayProjetosArquivados = [];
    let arrayProjetosAbertos = [];

    function asignTheCorrectState() {

      projetos.map(projeto => {

        if (projeto.arquivado === true) {
          arrayProjetosArquivados.push(projeto);
        } else {
          arrayProjetosAbertos.push(projeto);
        }
        return null;
        
      });

      setProjetosArquivados(arrayProjetosArquivados);
      setProjetosAbertos(arrayProjetosAbertos);
    }

    asignTheCorrectState();

  }, [projetos]);

  //=================================================================

  async function handleAddProjeto(data) {

    await api.post('/projetos', data)
    .then(response => {
      setProjetos([...projetos, response.data]);
    })
    .then(() => {
      setStringPagina('Listar');
    })
    .catch(error => console.log(error));

  }

  //=================================================================

  async function handleDeleteProjeto(id) {

    await api.delete(`/projetos/${id}`)
    .then(() => {
      setProjetos(projetos.filter(projeto => projeto._id !== id));
    })
    .catch(error => {
      console.log(error);
    });

  }

  //=================================================================

  async function handleUpdateProjeto(id, body) {

    var index = projetos.findIndex(x => x._id === id);

    const config = { headers: {'Content-Type': 'application/json'} };
    await api.put(`/projetos/${id}`, body, config)
    .then(() => {
      body._id = id;
      setProjetos([
        ...projetos.slice(0, index),
        body,
        ...projetos.slice(index+1)
      ]);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  //=================================================================

  const [stringPagina, setStringPagina] = useState('');

  function decideWhatToDisplay() {

    switch (stringPagina)  {

      case 'Listar':
        return (
          <Listar props={projetosAbertos} onDelete={handleDeleteProjeto}  onUpdate={handleUpdateProjeto} />
        );

      case 'Arquivados':
        return(
          <Arquivados props={projetosArquivados} onDelete={handleDeleteProjeto}  onUpdate={handleUpdateProjeto} />
        );

      case 'Cadastrar': 
        return (
          <CadastrarProjeto onSubmit={handleAddProjeto} />
        );

      default:
        return (
          <Home />
        );

    }
  }

  //=================================================================

  return (
    <div id="App">

      <header className="App-header cabecalho">
        <Cabecalho stringPagina={setStringPagina} />
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
