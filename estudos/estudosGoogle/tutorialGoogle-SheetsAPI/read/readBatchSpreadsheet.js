//https://developers.google.com/sheets/api/guides/values

const { google } = require("googleapis");

const authorization = require("../utils/auth");

authorization(readValues);
const planilhaID = "1HyqZVOpm0nWlqwtiOOvFVrDLPdRjM4arp8kK0xFc_yw";
const sheetTitle = "'Teste API'!";

//==================================
// LENDO MULTIPLOS RANGES (DESCONTÍNUOS) DAS PLANILHAS
// spreadsheets.values collection

// Single range -> spreadsheets.values.get
// Multiple ranges -> spreadsheets.values.batchGet

/**
 * Para ler os dados da planilha é necessário definir
 * os valores do ID da planilha e os ranges que serão
 * lidos em notação A1.
 */
const ranges = [`${sheetTitle + "A1:B1"}`, `${sheetTitle + "C2"}`];

const request = {
  spreadsheetId: planilhaID,
  ranges,
};

function readValues(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values
    .batchGet(request)
    .then((response) => {
      // A resposta vem no response.data.valueRanges
      console.log("response.data", response.data);
    })
    .catch((error) => {
      console.log("error", error);
    });
}
