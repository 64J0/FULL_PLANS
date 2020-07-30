import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import CadastrarProjeto from "../pages/CadastrarProjeto";
import Abertos from "../pages/ProjAbertos";
import Arquivados from "../pages/ProjArquivados";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Gerenciar from "../components/Gerenciar";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/gerenciar" component={Gerenciar} />
      <Route path="/cadastrar" component={CadastrarProjeto} />
      <Route path="/abertos" component={Abertos} />
      <Route path="/arquivados" component={Arquivados} />
    </Switch>

  )
}

export default Routes;