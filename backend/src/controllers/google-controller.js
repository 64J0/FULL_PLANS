// https://developers.google.com/sheets/api/guides/batchupdate
const { google } = require("googleapis");

const authorization = require("../utils/googleAuth");

const planilhaID = "1HyqZVOpm0nWlqwtiOOvFVrDLPdRjM4arp8kK0xFc_yw";

//= =================================
// ATUALIZANDO A PLANILHA (COM ESTILIZAÇÃO)
// spreadsheets collection

// batchUpdate

const cor = {
  style: "SOLID",
  color: {
    red: 0,
    blue: 0,
    green: 0,
  },
};

const customRange = {
  sheetId: 0,
  startRowIndex: 2,
  endRowIndex: 3,
  startColumnIndex: 4,
  endColumnIndex: 5,
};

const requests = {
  requests: [
    // Editar várias propriedades da célula
    {
      updateCells: {
        // rows: [],
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
                  // boolValue
                  // errorValue
                  // formulaValue
                  // numberValue
                },
              },
            ],
          },
        ],
        // fields: "string",
        fields: "userEnteredFormat, userEnteredValue",
        // start: "object (GridCoordinate)",
        // range: "object (GridRange)",
        range: customRange,
      },
    },
  ],
};

const request = {
  spreadsheetId: planilhaID,
  resource: requests,
  // includeSpreadsheetInResponse
  // responseRanges[]
  // responseIncludeGridData
};

function updateSpreadsheetData(auth) {
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

exports.fillsSpreadsheet = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    await authorization.authComplete(updateSpreadsheetData);
    return res.status(200).send({ ok: true });
  } catch (error) {
    return res.status(400).send({ error });
  }
};
