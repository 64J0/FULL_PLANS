import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import CadastrarProjeto from "../pages/CadastrarProjeto";
import Abertos from "../pages/ProjAbertos";
import Arquivados from "../pages/ProjArquivados";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Gerenciar from "../pages/GerenciarProjeto";
import Erro404 from '../pages/Erro404';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/gerenciar" component={Gerenciar} />
      <Route path="/cadastrar" component={CadastrarProjeto} />
      <Route path="/abertos" component={Abertos} />
      <Route path="/arquivados" component={Arquivados} />
      <Route path="/gerenciar" component={Gerenciar} />
      <Route path="/*" component={Erro404} />
    </Switch>

  )
}

export default Routes;