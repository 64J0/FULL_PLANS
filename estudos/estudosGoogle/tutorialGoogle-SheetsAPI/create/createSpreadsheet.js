const { google } = require("googleapis");

const authorization = require("../utils/auth");

authorization(createNewSpreadsheet);
const resource = {
  properties: {
    title: "From API",
  },
};

/**
 * Cria uma nova planilha com determinado nome
 * @param {google.auth.OAuth2} auth O cliente autenticado do Google.
 */
function createNewSpreadsheet(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets
    .create({
      resource,
      fields: "spreadsheetId",
    })
    .then((response) => {
      // Para pegar o ID da planilha que foi criada: response.data.spreadsheetId
      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
}
