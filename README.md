# FULL PLANS

## *Projeto de estudos*

Este projeto está sendo desenvolvido como meio de aprimorar meus conhecimentos na criação de uma API REST usando Nodejs, Express, MongoDB e o Mongoose, assim como aprimorar minhas habilidades no frontend com React principalmente. Os códigos da API foram baseados, principalmente, nessa sequência de posts do William Oliveira (https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-1-criando-e-listando-dados/).

### O que já foi desenvolvido:

* API Rest para comunicar com o banco de dados e servir informações para o frontend;
* Frontend capaz de consumir os dados servidos pelo backend;
* Operações CRUD básicas funcionando tanto no frontend quanto no backend, para cadastrar um novo projeto, deletar ou modificar um determinado projeto e exibir o conteúdo dos projetos no banco de dados;
* Funcionalidade de arquivar projetos finalizados, e separar em páginas diferentes;
* Implementar uma feature de buscar um projeto no banco de dados baseado numa search query;

### O que ainda será desenvolvido:

* Sistema de login para acessar as funcionalidades do resto da aplicação;
* Implementar um sistema de upload de arquivos para armazenar detalhes de projetos já finalizados. Para isso está sendo estudada uma implementação usando o GridFS do MongoDB, pois este é o banco de dados escolhido para se utilizar no projeto. *O GridFS deve ser usado quando for necessário guardar no banco de dados MongoDB um arquivo de tamanho superior a 16 MB*;
* Layout precisa ser ajustado para ficar mais user friendly:
  * Uma tela de confirmação quando o usuário quiser deletar um determinado arquivo;
  * Uma tela de loading para quando os projetos estiverem sendo carregados do banco de dados;
  * Uma mensagem de sucesso para caso o projeto tenha sido cadastrado corretamente;
  * Implementar um layout responsivo;
* Refatorar o código.

*Vinícius Gajo Marques Oliveira*, 2020.
