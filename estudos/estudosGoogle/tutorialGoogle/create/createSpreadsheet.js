const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { google } = require("googleapis");

// O escopo da autorização para criar uma nova planilha é definido neste link:
// https://developers.google.com/sheets/api/guides/authorizing
// Allows read/write access to the user's sheets and their properties.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// O arquivo token.json guarda os tokens de acesso do usuário, e é criado
// automaticamente quando os passos da autorização são concluídos pela primeira
// vez.
const TOKEN_PATH = path.resolve(__dirname, "../token.json");

// Essas credentials estão associadas à conta do Google Console
const credentialsPath = path.resolve(__dirname, "../../credentials.json");

// Carrega dados do cliente de um arquivo local (credentials.client_secret)
// Assíncrono!
fs.readFile(credentialsPath, (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);

  // Autoriza um cliente com as credenciais carregadas, após isso chama a API do Google Sheets
  authorize(JSON.parse(content), createNewSpreadsheet);
});

/**
 * Cria um cliente OAuth2 com as credenciais recebidas, pois será necessário
 * para ter acesso aos dados privados do usuário do sistema. Após obter essa
 * autorização será executada a função de callback passada.
 * @param {Object} credentials As credenciais de autorização do cliente.
 * @param {function} callback A função de callback para ser chamada com os dados
 * de autorização.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Verifica se já existe um TOKEN armazenado previamente.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Cria uma nova planilha com determinado nome
 * @param {google.auth.OAuth2} auth O cliente autenticado do Google.
 */
function createNewSpreadsheet(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets
    .create({
      resource: {
        properties: {
          title: "Planilha da API"
        }
      }
    })
    .then(response => {
      console.log("response", response);
    })
    .catch(error => {
      console.log("error", error);
    });
}
