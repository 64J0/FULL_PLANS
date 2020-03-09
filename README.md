# FULL PLANS :sparkles:

## *Projeto de estudos*

Este projeto está sendo desenvolvido como meio de aprimorar meus conhecimentos na criação de uma API REST usando Nodejs, Express, MongoDB e o Mongoose, assim como aprimorar minhas habilidades no frontend com React usando os Hooks. 

Os códigos da API foram baseados, principalmente, nessa sequência de posts do William Oliveira (https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-1-criando-e-listando-dados/). Foram utilizados alguns middlewares que não são citados neste site, visando melhorar o aspecto da segurança da aplicação.

### O que já foi desenvolvido :memo:: 

* API Rest para comunicar com o banco de dados e servir informações para o frontend;
* Frontend capaz de consumir os dados servidos pelo backend;
* Operações CRUD básicas funcionando tanto no frontend quanto no backend, para cadastrar um novo projeto, deletar ou modificar um determinado projeto e exibir o conteúdo dos projetos no banco de dados;
* Funcionalidade de arquivar projetos finalizados, e separar em páginas diferentes;
* Implementar uma feature de buscar um projeto no banco de dados baseado numa search query;
* Sistema de login para acessar as funcionalidades do resto da aplicação;
* ~~Implementar um sistema de upload de arquivos para armazenar detalhes de projetos já finalizados. Para isso está sendo estudada uma implementação usando o GridFS do MongoDB, pois este é o banco de dados escolhido para se utilizar no projeto. *O GridFS deve ser usado quando for necessário guardar no banco de dados MongoDB um arquivo de tamanho superior a 16 MB~~. Esta funcionalidade foi alterada, agora os arquivos do projeto serão salvos em um servidor provido pelo Google, e no banco de dados será armazenado apenas o link para aquele projeto;
* Desenvolver uma funcionalidade que preencha uma planilha do Excel automaticamente com os dados armazenados no banco de dados referentes ao projeto que estiver aberto;
* Estudar sobre a hospedagem no GCP e no Netlify;
* Deploy da API no GCP (Google Cloud Platform);
* O Frontend foi hospedado no Netlify;

### O que ainda será desenvolvido :memo::

* Estudar a possibilidade de implementação do Redux para trabalhar em conjunto com o React;
* Desenvolver um sistema de envio de e-mails automático, em que o projetista do desenho receberá um e-mail contendo valores para atualização das informações do desenho, como por exemplo, o número FULL;
* Implementar um sistema de autenticação e autorização;
* Layout precisa ser ajustado para ficar mais user friendly:
  * Uma tela de confirmação quando o usuário quiser deletar um determinado arquivo;
  * Uma tela de loading para quando os projetos estiverem sendo carregados do banco de dados;
  * Uma mensagem de sucesso para caso o projeto tenha sido cadastrado corretamente;
  * Implementar um layout responsivo;
* Refatorar o código.

### Como executar o projeto

:warning: Para executar o projeto deve-se configurar algumas variáveis de ambiente (.env) no lado do backend, como por exemplo a string de comunicação com o banco de dados. Além disso, o Frontend está configurado para buscar com o Axios a API num link específico para o ambiente em que o projeto está sendo desenvolvido, portanto, antes que você tente executá-lo, corrija o caminho da chave baseURl em frontend/src/services/api.js para o Ip correto. :warning:

Enfim, após terem sido realizadas estas alterações, basta abrir uma instância do prompt de comando e navegar até a pasta ./backend e executar:

```
cd backend
npm run dev
```

E em outra instância do prompt de comando, na pasta do frontend, executar:

```
cd frontend
npm start
```

*Vinícius Gajo Marques Oliveira*, 2020.
