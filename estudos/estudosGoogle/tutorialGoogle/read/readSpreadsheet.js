// https://developers.google.com/sheets/api/guides/values

const { google } = require("googleapis");

const authorization = require("../utils/auth");

authorization(readValues);
const planilhaID = "1HyqZVOpm0nWlqwtiOOvFVrDLPdRjM4arp8kK0xFc_yw";
const sheetTitle = "'Teste API'!";

//==================================
// LENDO VALORES DAS PLANILHAS
// spreadsheets.values collection

// Single range -> spreadsheets.values.get
// Multiple ranges -> spreadsheets.values.batchGet

/**
 * Para ler os dados da planilha é necessário definir
 * os valores do ID da planilha e os ranges que serão
 * lidos em notação A1.
 */
const request = {
  spreadsheetId: planilhaID,
  //range: sheetTitle + "A1:B1",
  range: sheetTitle + "E5",
  //majorDimension: ,
  //valueRenderOption: ,
  //dateTimeRenderOption:
};

function readValues(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values
    .get(request)
    .then((response) => {
      // A resposta vem no response.data.values
      console.log("response.data", response.data);
    })
    .catch((error) => {
      console.log("error", error);
    });
}
