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
  [
    // Cell values...
    "String 3",
    "String 4",
  ],
  // Aditional rows...
];

// Additional ranges to update...
const resource = {
  values,
};

const request = {
  spreadsheetId: planilhaID,
  range: `${sheetTitle + "B8"}`,
  valueInputOption: "USER_ENTERED",
  resource,
};

function writeValues(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values
    .append(request)
    .then((response) => {
      // A resposta vem no response.data.values
      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
}
