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

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return console.error("Error trying to retrieve access token", err);
      }
      oAuth2Client.setCredentials(token);

      // Salva esse token no disco para execuções futuras do programa
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

module.exports = function authComplete(callbackFunction) {
  fs.readFile(credentialsPath, (err, content) => {
    if (err) return console.log("Error loading client secret file: ", err);

    authorize(JSON.parse(content), callbackFunction);
  });
};
