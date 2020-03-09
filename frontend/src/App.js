import React, { useState, useEffect } from 'react';

import api from './services/api';
import CadastrarProjeto from './components/CadastrarProjeto';
import Cabecalho from './components/Cabecalho';
import Abertos from './components/Abertos';
import Arquivados from './components/Arquivados';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Gerenciar from './components/Gerenciar';

import './App.css';
import './global.css';
import './components/Cabecalho.css';

function App() {

  const [projetos, setProjetos] = useState([]);
  const [projetosArquivados, setProjetosArquivados] = useState([]);
  const [projetosAbertos, setProjetosAbertos] = useState([]);
  const [login, setLogin] = useState(false);
  const [projetoUpdate, setProjetoUpdate] = useState('');


  const [auxProjetoUpdate, setAuxProjetoUpdate] = useState();
  const [auxProjetos, setAuxProjetos] = useState();
  const [toggleUpdate, setToggleUpdate] = useState(false);

  const configAuth = {
    headers: {
      Authorization: 'Bearer ' + String(login.token)
    }
  };

  /*
  * CARREGA OS DADOS DO BANCO DE DADOS NA RENDERIZAÇÃO INICIAL
  */
  useEffect(() => {

    async function loadProjetos() {

      const response = await api.get('/projetos', configAuth);
      setProjetos(response.data);
      
    }

    if (login.auth === true) {
      loadProjetos();
    }
  
  // eslint-disable-next-line
  }, [login.auth]);

  /*
  * FAZ A ALOCAÇÃO DOS DADOS EM ESTADOS DIFERENTES BASEADO NA PROPRIEDADE ARQUIVADO 
  * PARA MOSTRAR NAS PÁGINAS CORRETAS
  */
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

  function displayLogin() {

    if (!login.auth) {

      return (
        <Login onSubmit={handleLogin} />
      );

    } else {

      return (
        <>
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
        </>
      );

    }
  }

  //=================================================================

  async function handleLogin(data) {

    await api.post('/login', data)
    .then(response => {

      if (!response.data.auth) {
        alert('Falha no login');
        throw new Error();
      } else {
        setLogin(response.data);
      }

    })
    .catch(error => console.log(error));

  }

  //=================================================================

  async function handleAddProjeto(data) {

    data.status = 'Novo projeto';
    await api.post('/projetos', data, configAuth)
    .then(response => {
      setProjetos([...projetos, response.data]);
    })
    .then(() => {
      setStringPagina('Abertos');
    })
    .catch(error => console.log(error));

  }

  //=================================================================

  /*
  async function handleDeleteProjeto(id) {

    await api.delete(`/projetos/${id}`)
    .then(() => {
      setProjetos(projetos.filter(projeto => projeto._id !== id));
    })
    .catch(error => {
      console.log(error);
    });

  }
  */

  //=================================================================

  /*
  * ATUALIZA OS ESTADOS
  */
  async function handleUpdateProjeto(id, body) {

    var index = projetos.findIndex(x => x._id === id);

    await api.put(`/projetos/${id}`, body, configAuth)
    .then((response) => {
      setAuxProjetoUpdate(response.data);
    })
    .then(() => {
      body._id = id;

      const projetosAtualizados = [
        ...projetos.slice(0, index),
        body,
        ...projetos.slice(index+1)
      ];
      setAuxProjetos(projetosAtualizados);
    })
    .then(() => {
      setToggleUpdate(true);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  useEffect(() => {

    function atualizaTudo() {
      new Promise((resolve, reject) => {
        setProjetos(auxProjetos);
        resolve(true);
      })
      .then(() => {
        setProjetoUpdate(auxProjetoUpdate);
      })
      .then(() => {
        setToggleUpdate(false);
      })
    }

    if (toggleUpdate) {
      atualizaTudo();
    }

  }, [toggleUpdate, auxProjetos, auxProjetoUpdate]);

  //=================================================================

  const [stringPagina, setStringPagina] = useState('');

  function decideWhatToDisplay() {

    switch (stringPagina)  {

      case 'Abertos':
        return (
          <Abertos 
            props={projetosAbertos} 
            display={setStringPagina}
            setProjeto={setProjetoUpdate} />
        );

      case 'Arquivados':
        return(
          <Arquivados 
            props={projetosArquivados} 
            display={setStringPagina}
            setProjeto={setProjetoUpdate} />
        );

      case 'Cadastrar': 
        return (
          <CadastrarProjeto 
            onSubmit={handleAddProjeto} />
        );

      case 'Gerenciar':
        return (
          <Gerenciar 
            projeto={projetoUpdate} 
            display={setStringPagina}
            onUpdateProjeto={handleUpdateProjeto} />
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

      {
        displayLogin()
      }
      
    </div>
  );
}

export default App;