"use strict";

const { google } = require("googleapis");

// Autenticação + Autorização
const authorization = require("../utils/auth");

authorization(editSpreadsheet);

//========================================================================================
// REQUISIÇÃO:

const exampleData = require("./exampleData.json");
const idSpreadsheet = "1HyqZVOpm0nWlqwtiOOvFVrDLPdRjM4arp8kK0xFc_yw";

// batchUpdate
/*
const request = {
  spreadsheetId: idSpreadsheet,
  resource: {
    requests: [
      {
        updateSpreadsheetProperties: {
          properties: {
            title: `GRD ${exampleData.numGRD}`,
          },
          fields: "title",
        },
      },

      {
        updateSheetProperties: {
          // Título da folha da planilha
          fields: "title",
          properties: {
            title: "GRD",
          },
        },
      },
    ],
  },
};
*/

// values.update
var request = {
  // The ID of the spreadsheet to update.
  spreadsheetId: idSpreadsheet,

  // The A1 notation of the values to update.
  range: "'Teste API'!A:B",

  // How the input data should be interpreted.
  valueInputOption: "USER_ENTERED",

  resource: {
    values: [["Nova string vinda da API", "Teste"]],
  },
};

/**
 * Edita uma planilha com determinado id
 * @param {google.auth.OAuth2} auth O cliente autenticado do Google.
 */
function editSpreadsheet(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values
    .update(request)
    .then((response) => {
      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
}
