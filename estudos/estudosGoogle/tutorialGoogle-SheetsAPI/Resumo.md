# Resumo dos meus estudos sobre a API do Google:

A API do Google Sheets permite ler e modificar qualquer aspecto de uma planilha do Drive. A API fornece basicamente dois métodos principais de interagir com a planilhas:

- Ler/escrever valores em planilhas (<strong>spreadsheets.values.collection</strong>).
- Ler/escrever qualquer aspecto da planilha (<strong>spreadsheets collection</strong>)

## Autenticação e autorização:

Quando uma aplicação tenta acessar <strong>dados privados</strong> de uma conta com a API do Google, o acesso precisa ser autorizado e autenticado por um usuário que tem acesso àqueles dados.

Quando a aplicação tenta acessar dados públicos, o pedido não precisa da autorização, mas precisa ser acompanhado de um identificador, como uma chave da API.

Toda requisição que a aplicação envia à API do Google Sheets precisa identificar a aplicação para o Google. Existem duas formas de identificar uma aplicação: usando um token OAuth 2.0 (que também autoriza o pedido) e/ou usando a chave da API.

- Se o pedido requer autorização (dados privados de um usuário), então a aplicação deve providenciar um token OAuth 2.0 na requisição. A aplicação pode ainda providenciar a chave da API, mas não é necessário.

- Se o pedido não requer autorização (dados públicos), então a aplicação deve providenciar a chave da API ou o token OAuth 2.0 - o que for mais conveniente.

### Autorizando pedidos com OAuth 2.0:

1. Quando você cria sua publicação, você a registra usando o Google API Console. O Google então providencia informações que serão necessárias depois, como o client ID e o client secret (credentials.json).

2. É necessário então ativar a API do Google Sheets no Google API Console.

3. Quando a aplicação precisa de acesso a dados privados de um usuário, ela pede ao Google por um escopo particular de acesso.

4. O Google mostra uma tela de consentimento ao usuário, pedindo autorização para a aplicação acessar seus dados.

5. Se o usuário aprovar, o Google da à aplicação um token de acesso de vida curta.

6. A aplicação pede os dados do usuário, anexando o token de acesso à requisição.

<i>Para ter acesso usando OAuth 2.0, a aplicação deve apresentar a informação de qual escopo quer autorização no código do programa.</i>

## 3 opções para usar a API do Google Sheets no Node.js:

- Google API v3:

  - fácil de usar;
  - vai ser descontinuada futuramente;
  - limitada (não permite editar planilhas);

- Google API v4:

  - difícil de usar;
  - poderosa (caso você conheça os comandos);

- npm google-spreadsheet:
  - mais fácil e intuitivo de usar (comparado ao Google API v4);
  - poderosa (mesmas capacidades da Google API v4);
  - mais difícil de conseguir autorização.

## Conceitos importantes:

- Spreadsheet ID: é o valor da URL da planilha que vem após o /d/. É o ID do arquivo que será editado.
- Sheet ID: Folhas individuais em planilhas tem títulos e ID's que devem ser únicos. É possível definir esse valor na URL após /d/spreadsheetID/edit#gid=<strong>sheetID</strong>.
- Notação A1: Alguns métodos da API necessitam de um range em notação A1. Por exemplo:
  - Sheet1!A1:B2 -> Se refere às duas primeiras células nas duas primeiras linhas da folha Sheet1.
  - Sheet1!A:A -> Se refere a todas as células na primeira coluna da folha Sheet1.
  - 'Teste API'!A1-> Se refere a célula A1 da folha 'Teste API'.
  - Sheet1!1:2 -> Se refere a todas as células nas duas primeiras linhas da tabela.
