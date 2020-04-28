//https://developers.google.com/sheets/api/guides/values

const { google } = require("googleapis");

const authorization = require("../utils/auth");

authorization(writeValues);
const planilhaID = "1HyqZVOpm0nWlqwtiOOvFVrDLPdRjM4arp8kK0xFc_yw";
const sheetTitle = "'Teste API'!";

//==================================
// ESCREVENDO MULTIPLOS VALORES NAS PLANILHAS
// spreadsheets.values collection

// Single range -> spreadsheets.values.get
// Multiple ranges -> spreadsheets.values.batchGet

let values = [
  ["String 1", "String 2"],
  // Aditional rows...
];

const data = [
  {
    range: `${sheetTitle + "B6"}`,
    values,
  },
  {
    range: `${sheetTitle + "E6"}`,
    values,
  },
];

// Additional ranges to update...
const resource = {
  data,
  valueInputOption: "RAW",
};

const request = {
  spreadsheetId: planilhaID,
  resource,
};

function writeValues(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values
    .batchUpdate(request)
    .then((response) => {
      // A resposta vem no response.data.values
      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
}
