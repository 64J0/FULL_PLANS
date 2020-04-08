//https://developers.google.com/sheets/api/guides/values

const { google } = require("googleapis");

const authorization = require("../utils/auth");

authorization(writeValues);
const planilhaID = "1HyqZVOpm0nWlqwtiOOvFVrDLPdRjM4arp8kK0xFc_yw";
const sheetTitle = "'Teste API'!";

//==================================
// ESCREVENDO VALORES NAS PLANILHAS
// spreadsheets.values collection

// Single range -> spreadsheets.values.get
// Multiple ranges -> spreadsheets.values.batchGet

/**
 * Para escrever dados da planilha é necessário definir
 * os valores do ID da planilha, os ranges que serão
 * lidos em notação A1 e os dados que serão escritos
 * arranjados em uma maneira apropriada no objeto da
 * requisição.
 *
 * Os updates requerem um parâmetro ValueInputOption
 * válido (para updates singulares, esse parâmetro é
 * um query param necessário; para múltiplos updates,
 * esse parâmetro é necessário na req body).
 *
 * O parâmetro ValueInputOption controla quando as
 * strings de entrada são parsed ou não.
 *
 * Opções do ValueInputOption:
 *
 * RAW          -> O input não é parsed, ou seja, é
 * simplesmente inserido como string, então o input
 * "=1+2" é entendido como uma string, não uma fórmula.
 *
 * USER_ENTERED -> O input é parsed exatamente da mesma
 * forma como se fosse colocado na aplicação web das
 * planilhas.
 */

const request = {
  spreadsheetId: planilhaID,
  range: `${sheetTitle + "A4"}`,
  valueInputOption: "RAW",
  resource: {
    values: [
      [
        // Cell values ...
        "Uhuuuuuul",
      ],
      // Additional rows ...
    ],
  },
};

function writeValues(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values
    .update(request)
    .then((response) => {
      // A resposta vem no response.data.values
      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
}
