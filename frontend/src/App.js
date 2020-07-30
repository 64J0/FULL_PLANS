import React from "react";
import { BrowserRouter } from 'react-router-dom';

// Hooks
import AppProvider from './hooks';

// Rotas
import Routes from './routes';

// CSS
import GlobalStyles from "./styles/global";

function App() {
  /*
  // decideWhatToDisplay()
  //
  // Essa função define qual o componente que será renderizado na tela do usuário
  // do sistema. Para isso, ele utiliza o estado armazenado na variável stringPagina.
  const [stringPagina, setStringPagina] = useState("");

  const decideWhatToDisplay = useCallback(() => {
    switch (stringPagina) {
      case "Abertos":
        return (
          <Abertos
            props={projetosAbertos}
            display={setStringPagina}
            setProjeto={setProjetoUpdate}
          />
        );

      case "Arquivados":
        return (
          <Arquivados
            props={projetosArquivados}
            display={setStringPagina}
            setProjeto={setProjetoUpdate}
          />
        );

      case "Cadastrar":
        return <CadastrarProjeto onSubmit={handleAddProjeto} />;

      case "Gerenciar":
        return (
          <Gerenciar
            projeto={projetoUpdate}
            display={setStringPagina}
            onUpdateProjeto={handleUpdateProjeto}
          />
        );

      default:
        return <Home />;
    }
  }, [handleAddProjeto, handleUpdateProjeto, projetoUpdate, projetosAbertos, projetosArquivados, stringPagina]);

  // displayLogin()
  //
  // Essa função determina qual a tela que será exibida para o usuário quando
  // ele carrega a aplicação. Em um primeiro momento, enquanto ele ainda não fez
  // login será exibido o componente <Login />, porém quando ele já estiver logado
  // e autenticado, serão exibidos os demais componentes.
  const displayLogin = useCallback(() => {
    if (!login) {
      return <Login />;
    } else {
      return (
        <>
          <header className="App-header cabecalho">
            <Cabecalho stringPagina={setStringPagina} />
          </header>
          <main className="App-main">{decideWhatToDisplay()}</main>
          <footer className="App-footer">
            <Footer />
          </footer>
        </>
      );
    }
  }, [decideWhatToDisplay, login]);
  
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
        });
    }

    if (toggleUpdate) {
      atualizaTudo();
    }
  }, [toggleUpdate, auxProjetos, auxProjetoUpdate, setProjetos]);
  */

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
