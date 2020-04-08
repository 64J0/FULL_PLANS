const { google } = require("googleapis");

const authorization = require("../utils/auth");

authorization(createNewSpreadsheet);
const resource = {
  properties: {
    title: "From API",
    locale: "pt-BR",
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
      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
}
