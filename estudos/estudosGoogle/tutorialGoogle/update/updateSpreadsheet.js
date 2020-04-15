//https://developers.google.com/sheets/api/guides/batchupdate

const { google } = require("googleapis");

const authorization = require("../utils/auth");

authorization(updateValues);
const planilhaID = "1HyqZVOpm0nWlqwtiOOvFVrDLPdRjM4arp8kK0xFc_yw";
//const sheetTitle = "'Teste API'!";

//==================================
// ATUALIZANDO A PLANILHA (COM ESTILIZAÇÃO)
// spreadsheets collection

// batchUpdate

/**
 * Além dos dados contidos nas células, uma planilha
 * inclui muitos outros tipos de dados, por exemplo:
 * Formato das células,
 * Bordas das células,
 * Ranges nomeados,
 * Ranges protegidos,
 * Formatação condicional,
 * Etc...
 *
 * As operações suportadas pelo método batchUpdate podem
 * ser agrupadas nas seguintes categorias:
 * Adicionar  -> Adiciona novos objetos
 * Atualizar  -> Atualiza certas propriedades de um objeto
 * Deletar    -> Remove objetos
 *
 * O método batchUpdate funciona recebendo um ou mais
 * objetos de requisição (request), cada qual especificando
 * um tipo de requisição a ser realizada.
 * Consultar a tabela do seguinte link para mais detalhes:
 * https://developers.google.com/sheets/api/guides/batchupdate#batch_update_operations
 */

const cor = {
  style: "SOLID_THICK",
  color: {
    red: 0,
    blue: 0,
    green: 0,
  },
};

const customRange = {
  sheetId: 0,
  startRowIndex: 1,
  endRowIndex: 2,
  startColumnIndex: 4,
  endColumnIndex: 5,
};

const requests = {
  requests: [
    // Adicionar bordas
    /*
    {
      updateBorders: {
        range: customRange,
        top: cor,
        left: cor,
        bottom: cor,
        right: cor,
      },
    },
    */

    // Editar várias propriedades da célula
    {
      updateCells: {
        //rows: [],
        rows: [
          {
            values: [
              // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#CellData
              {
                userEnteredFormat: {
                  verticalAlignment: "MIDDLE",
                  horizontalAlignment: "CENTER",
                  backgroundColor: {
                    red: 1,
                  },
                  borders: {
                    top: cor,
                    left: cor,
                    bottom: cor,
                    right: cor,
                  },
                  textFormat: {
                    bold: true,
                  },
                },

                userEnteredValue: {
                  stringValue: "From API",
                  //boolValue
                  //errorValue
                  //formulaValue
                  //numberValue
                },
              },
            ],
          },
        ],
        //fields: "string",
        fields: "userEnteredFormat, userEnteredValue",
        //start: "object (GridCoordinate)",
        //range: "object (GridRange)",
        range: customRange,
      },
    },
  ],
};

const request = {
  spreadsheetId: planilhaID,
  resource: requests,
  //includeSpreadsheetInResponse
  //responseRanges[]
  //responseIncludeGridData
};

function updateValues(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets
    .batchUpdate(request)
    .then((response) => {
      // A resposta vem no response.data.values
      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
}
