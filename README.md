# FULL PLANS :sparkles:

Ferramenta de planejamento e gerenciamento de projetos.

## Back-end

Os códigos da API *Rest* foram baseados, principalmente, nessa sequência de posts do William Oliveira (<a href="https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-1-criando-e-listando-dados/">link do blog</a>). Algumas tecnologias utilizadas foram *NodeJS*, *Express* para roteamento, banco de dados *MongoDB* com *Mongoose*.

* NodeJS -> Motor de execução de códigos JavaScript em tempo de execução;
* Express -> Roteamento e middlewares da aplicação;
* MongoDB -> Banco de dados não-relacional escolhido pois foi a opção mais fácil com base nos meus conhecimentos prévios;
* Mongoose -> ODM do MongoDB;
* Morgan -> *Middleware* que gera *logs* no servidor sobre verbos HTTP que são chamados;
* HPP -> *Middleware* usado para proteger o projeto de poluição de parâmetros HTTP;
* CORS -> *Cross-Origin Resource Sharing*, é um módulo que adiciona *headers* à requisição para evitar o erro de *CORS* no navegador;
* Helmet -> *Middleware* de segurança que adiciona alguns *headers* HTTP;
* Express-rate-limit -> *Middleware* básico de limitação de requisições para o *Express*. Usado para limitar solicitações repetidas a APIs e/ou *endpoints* públicos, como redefinição de senha;
* Cookie-parser -> *Middleware* que configura os *cookies* anexados ao objeto da requisição do cliente;
* BCryptJS -> Pacote com funções de encriptação e verificação;
* Exceljs -> Pacote usado para manipular arquivos xlsx do *Excel*;

## Front-end

Para desenvolver o frontend foi utilizado, basicamente, ReactJS com Hooks.

### O que já foi desenvolvido :memo:: 

* API *Rest* para comunicar com o banco de dados e servir informações para o *front-end*;
* *Front-end* capaz de consumir os dados servidos pelo *back-end*;
* Operações CRUD básicas funcionando tanto no *front-end* quanto no *back-end*, para cadastrar um novo projeto, deletar ou modificar um determinado projeto e exibir o conteúdo dos projetos no banco de dados;
* Funcionalidade de arquivar projetos finalizados, e separar em páginas diferentes;
* Sistema de login para acessar as funcionalidades da aplicação;
* Implementar um sistema de autenticação e autorização usando JWT (*JSON Web Token*);
* Implementar um sistema de paginação na aba de **Projetos Arquivados** para quando o banco de dados estiver com vários itens. Não será necessário implementar essa feature para os **Projetos Abertos** pois acredita-se que a sua quantidade não será realmente grande visto a rapidez com que os projetos são feitos na empresa;
* Funcionalidade de salvar a sessão do usuário, salvando suas credenciais no *localStorage* do navegador.
* Preencher uma planilha do *Excel* estilizada previamente de maneira automática com alguns dados armazenados no banco de dados referentes ao projeto que estiver aberto. O número da planilha será corrigido com base numa regra específica da empresa e segue uma ordem crescente;
* Determinar uma lista suspensa para escolha do *status* dos projeto;
* Novo *update* 20/08/2020: 
  * Agora o usuário **administrador** é capaz de cadastrar novos usuários para usar o sistema;
  * É possível também baixar um *PDF* com algumas informações resumidas do projeto;
  * Foi feita uma refatoração do projeto para deixar o código mais elegante;
* *Deploy* da API no GCP (*Google Cloud Platform*);
* O *front-end* está hospedado no *Netlify*, pois o plano gratuito atende bem as necessidades atuais;

### O que ainda será desenvolvido :memo::

* Desenvolver um sistema de envio de e-mails automático, em que o projetista do desenho receberá um e-mail contendo valores para atualização das informações do desenho, como por exemplo, o número FULL;
* Configurar o CORS para permitir acessar a API apenas de determinadas URLs;
* Criar um Error Handler global e personalizado para o back-end padronizar as mensagens de erro;
* Definir os arquivos de testes automatizados para o projeto inteiro, começando pelo back-end;
* Funcionalidade necessária: Criar um botão no frontend para fazer download dos arquivos de desenhos salvos no ~~Google Drive~~ **OneDrive**. Serão acessados os links salvos para cada projeto, esses desenhos devem ser baixados em formato .zip.
* *Layout* precisa ser ajustado para ficar mais *user friendly*:
  * Uma tela de *loading* para quando os projetos estiverem sendo carregados do banco de dados;
  * Uma mensagem de sucesso para caso o projeto tenha sido cadastrado corretamente;
  * Implementar um *layout* responsivo;
* Escrever testes automatizados, inicialmente focados apenas no *back-end*.

## Como executar o projeto

:warning: Para executar o projeto deve-se configurar algumas variáveis de ambiente (.env) no *back-end*, como por exemplo a string de comunicação com o banco de dados. Além disso, o *front-end* está configurado para buscar com o *Axios* a API num link específico para o ambiente em que o projeto está sendo desenvolvido, portanto, antes que você tente executá-lo, corrija o caminho da chave *baseURl* em *frontend/src/services/api.js* para o *IP* correto. :warning:

Enfim, após terem sido realizadas estas alterações, basta abrir uma instância do prompt de comando e navegar até a pasta *./backend* e executar:

```bash
cd backend
npm run dev
```

E em outra instância do prompt de comando, na pasta do frontend, executar:

```bash
cd frontend
npm start
```

*Vinícius Gajo Marques Oliveira*, 2020.
