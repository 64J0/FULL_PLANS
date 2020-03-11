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

  // Header das requisições http com informações sobre o JWT (JSON Web Token)
  const configAuth = {
    headers: {
      Authorization: 'Bearer ' + String(login.token)
    }
  };


  // loadProjetos()
  //
  // Carrega os dados do banco de dados na primeira renderização do aplicativo. Esse trecho
  // de código vai sempre repetir quando o valor da propriedade login.auth mudar.
  useEffect(() => {
    async function loadProjetos() {

      const response = await api.get('/projetos', configAuth);
      console.log('response.data ', response.data);
      setProjetos(response.data);
      
    }

    if (login.auth === true) {
      loadProjetos();
    }
  
  // eslint-disable-next-line
  }, [login.auth]);


  // asignTheCorrectState()
  //
  // Faz a alocação dos projetos em estados diferentes, baseado na propriedades arquivado
  // de cada um dos dados. Esse trecho de código vai repetir sempre que o valor do estado
  // de projetos for alterado, para desta forma separar corretamente os projetos em cada
  // aba.
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


  useEffect(() => {
    let maiorNumGRD = 357;
    async function setNumeroDaGRD() {
      for(let aux = 0; aux < projetos.length; aux++) {
        console.log('maiorNumGRD ', maiorNumGRD);
        if ((projetos[aux].numGRD) && (projetos[aux].numGRD > maiorNumGRD)) {
          maiorNumGRD = projetos[aux].numGRD + 1;
        } else if (!projetos[aux].numGRD) {
          await handleUpdateProjeto(projetos[aux]._id, {
            numGRD: maiorNumGRD
          });
        }
      }
    }

    setNumeroDaGRD();
  // eslint-disable-next-line
  }, [projetos]);


  // displayLogin()
  //
  // Essa função determina qual a tela que será exibida para o usuário quando
  // ele carrega a aplicação. Em um primeiro momento, enquanto ele ainda não fez
  // login será exibido o componente <Login />, porém quando ele já estiver logado
  // e autenticado, serão exibidos os demais componentes.
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


  // handleLogin()
  //
  // Essa função, como o próprio nome indica, lida com a tentativa de login do
  // usuário. Ela é assíncrona, e recebe dois valores como parâmetros, que são abstraídos
  // em um objeto chamado data (data.login, data.senha).
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
    .catch(() => {console.log('Credenciais inválidas')});
  }


  // handleAddProjeto()
  //
  // Essa função é responsável por adicionar um projeto ao banco de dados do sistema.
  // Ela faz a chamada à API passando os dados que são passados em sua chamada, que por
  // sua vez são abstraídos em um objeto chamado data.
  async function handleAddProjeto(data) {
    data.status = 'Novo projeto'; // Esse dado não é cadastrável no componente
    await api.post('/projetos', data, configAuth)
    .then(response => {
      setProjetos([...projetos, response.data]);
    })
    .then(() => {
      setStringPagina('Abertos');
    })
    .catch(error => console.log(error));
  }


  // handleDeleteProjeto()
  //
  // Essa função foi comentada porque atualmente nenhum projeto será deletado do
  // banco de dados. Quando um projeto for finalizado ele será arquivado.
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


  // handleUpdateProjeto
  //
  // Essa função é responsável por chamar a rota da API que executa o método PUT,
  // atualizando os dados de um projeto específico com os valores que serão passados
  // no body da requisição. Além disso, para evitar uma nova chamada à rota inicial que
  // seta o estado dos projetos, é feita uma atualização local na variável projetos que
  // está sendo utilizada nessa instância da aplicação.
  //
  // ESSE TRECHO DE CÓDIGO AINDA PODE SER MELHORADO, PORÉM FALTA CONHECIMENTO AO AUTOR 
  // DO CÓDIGO
  async function handleUpdateProjeto(id, body) {

    var index = projetos.findIndex(x => x._id === id);
    if (!index) throw new Error();

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


  // decideWhatToDisplay()
  //
  // Essa função define qual o componente que será renderizado na tela do usuário
  // do sistema. Para isso, ele utiliza o estado armazenado na variável stringPagina.
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


  return (
    <div id="App">
      {
        displayLogin()
      }
    </div>
  );
}

export default App;