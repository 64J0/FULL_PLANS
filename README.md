# FULL PLANS :sparkles:

### Backend

Os códigos da API Rest foram baseados, principalmente, nessa sequência de posts do William Oliveira (<a href="https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-1-criando-e-listando-dados/">link do blog</a>). Algumas tecnologias utilizadas foram NodeJS, Express para roteamento, banco de dados MongoDB com Mongoose. Além disso foram utilizados alguns middlewares que não são citados neste site, visando melhorar o aspecto da segurança da aplicação, e possibilidade de implementação de novas features.

### Frontend

Para desenvolver o frontend foi utilizado, basicamente, ReactJS com Hooks.

### O que já foi desenvolvido :memo:: 

* API Rest para comunicar com o banco de dados e servir informações para o frontend;
* Frontend capaz de consumir os dados servidos pelo backend;
* Operações CRUD básicas funcionando tanto no frontend quanto no backend, para cadastrar um novo projeto, deletar ou modificar um determinado projeto e exibir o conteúdo dos projetos no banco de dados;
* Funcionalidade de arquivar projetos finalizados, e separar em páginas diferentes;
* Sistema de login para acessar as funcionalidades do resto da aplicação;
* ~~Implementar um sistema de upload de arquivos para armazenar detalhes de projetos já finalizados. Para isso está sendo estudada uma implementação usando o GridFS do MongoDB, pois este é o banco de dados escolhido para se utilizar no projeto. *O GridFS deve ser usado quando for necessário guardar no banco de dados MongoDB um arquivo de tamanho superior a 16 MB~~. Esta funcionalidade foi alterada, agora os arquivos do projeto serão salvos em um servidor provido pelo Google, e no banco de dados será armazenado apenas o link para aquele projeto;
* Implementar um sistema de autenticação e autorização usando JWT;
* ~~Estudar a possibilidade de implementação do Redux para trabalhar em conjunto com o React~~. Conforme o sistema foi sendo desenvolvido não foi realmente necessária a utilização do Redux.
* Funcionalidade de salvar a sessão do usuário, salvando suas credenciais no localStorage do navegador.
* Estudar sobre a hospedagem no GCP e no Netlify;
* Deploy da API no GCP (Google Cloud Platform);
* O Frontend foi hospedado no Netlify;

### O que ainda será desenvolvido :memo::

* Desenvolver um sistema de envio de e-mails automático, em que o projetista do desenho receberá um e-mail contendo valores para atualização das informações do desenho, como por exemplo, o número FULL;
* Configurar o CORS para permitir acessar a API apenas de determinadas URLs;
* ~~Desenvolver uma funcionalidade que preencha uma planilha do Excel automaticamente com os dados armazenados no banco de dados referentes ao projeto que estiver aberto (com estilização). O número da planilha será corrigido com base numa regra específica da empresa e segue uma ordem crescente~~. A meta atual é preencher uma planilha do Google Spreadsheet formatada com os dados do projeto;
* Implementar um sistema de paginação para quando o banco de dados estiver com vários itens;
* Funcionalidade necessária: Criar um botão no frontend para fazer download dos arquivos de desenhos salvos no Google Drive. Serão acessados os links salvos para cada projeto, esses desenhos devem ser baixados em formato .zip.
* Layout precisa ser ajustado para ficar mais user friendly:
  * Uma tela de loading para quando os projetos estiverem sendo carregados do banco de dados;
  * Uma mensagem de sucesso para caso o projeto tenha sido cadastrado corretamente;
  * Implementar um layout responsivo;
* Escrever testes automatizados;
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

### Algumas telas da aplicação

* Login:

![Tela de login](https://github.com/64J0/FULL_PLANS/blob/master/imagens/preview-site/tela-login.JPG)

* Home:

![Tela home](https://github.com/64J0/FULL_PLANS/blob/master/imagens/preview-site/tela-home.JPG)

* Cadastro de projetos:

![Tela de cadastro de projetos](https://github.com/64J0/FULL_PLANS/blob/master/imagens/preview-site/projetos-cadastro.png)

* Projetos abertos:

![Tela de projetos abertos](https://github.com/64J0/FULL_PLANS/blob/master/imagens/preview-site/projetos-abertos.png)

* Detalhes do projeto:

![Tela de detalhes do projeto](https://github.com/64J0/FULL_PLANS/blob/master/imagens/preview-site/projetos-detalhes.png)

*Vinícius Gajo Marques Oliveira*, 2020.
