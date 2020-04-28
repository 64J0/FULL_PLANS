// https://developers.google.com/sheets/api/guides/batchupdate
const { google } = require("googleapis");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const Projetos = mongoose.model("Projetos");

const generateRequestObjectToBatchUpdate = require("../utils/createRequestGoogle");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// =============================================================
// AUTORIZAÇÃO
// É necessário enviar junto à requisição um token OAuth 2

// O escopo da autorização para criar uma nova planilha é definido neste link:
// https://developers.google.com/sheets/api/guides/authorizing
// Allows read/write access to the user's sheets and their properties.

// =============================================================
// DADOS ESTÁTICOS
const planilhaID = "1HyqZVOpm0nWlqwtiOOvFVrDLPdRjM4arp8kK0xFc_yw";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// O arquivo token.json guarda os tokens de acesso do usuário
const TOKEN_PATH = path.resolve(__dirname, "../../tmp/token.json");
// Credenciais da minha API no Google, identificam o meu projeto
// para a API do Google Cloud Platform
const APIcredentials = {
  clientId: String(process.env.CLIENT_ID),
  clientSecret: String(process.env.CLIENT_SECRET),
  redirectUri: JSON.parse(process.env.REDIRECT_URIS),
};

// =============================================================
// FUNÇÕES
// Essa função deve ser alterada para refletir a realidade do software atual
function getNewToken(oAuth2Client, response) {
  const authUrl = oAuth2Client.generateAuthUrl({
    scope: SCOPES,
  });
  return response.redirect(authUrl);
}

async function authorize(response, callback, requestObjectGoogleSheets) {
  const oAuth2Client = new google.auth.OAuth2(
    APIcredentials.clientId,
    APIcredentials.clientSecret,
    APIcredentials.redirectUri[2]
  );

  try {
    await fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        console.log(err);
        return getNewToken(oAuth2Client, response);
      }
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client, response, requestObjectGoogleSheets);
    });
  } catch (err) {
    return console.log(err);
  }
}

async function updateSpreadsheetData(
  auth,
  response,
  requestObjectGoogleSheets
) {
  try {
    // response.status(200).send(requestObjectGoogleSheets);
    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets
      .batchUpdate(requestObjectGoogleSheets)
      .then(() => {
        return response.status(200).send(requestObjectGoogleSheets);
      })
      .catch((error) => {
        console.log({ "Error batchUpdate": error });
        throw new Error(error);
      });
  } catch (err) {
    return console.log(err);
  }
}

async function findProjectDataInDB(project_id) {
  try {
    const projectObject = await Projetos.findById(project_id);
    return projectObject;
  } catch (err) {
    throw new Error("Couldn't find the project with the informed ID");
  }
}

exports.fillsSpreadsheet = async (req, res) => {
  const { project_id } = req.params;
  try {
    await findProjectDataInDB(project_id)
      .then((response) => {
        // response -> Dados do projeto no banco de dados
        const requestObject = generateRequestObjectToBatchUpdate({
          projectData: response,
        });
        return requestObject;
      })
      .then((response) => {
        // response -> Objeto da requisição batchUpdate
        authorize(res, updateSpreadsheetData, response);
      });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

// =============================================================
// Rota específica para criar o token.json com o código informado no req.query
exports.authorize = async (req, res) => {
  // Recebe o token no req.query
  const { code } = req.query;

  // Cria uma nova instância de um OAuth2
  const oAuth2Client = new google.auth.OAuth2(
    APIcredentials.clientId,
    APIcredentials.clientSecret,
    APIcredentials.redirectUri[2]
  );

  // Salva o token
  oAuth2Client.getToken(code, async (err, token) => {
    if (err) {
      return console.error("Error trying to retrieve access token", err);
    }
    oAuth2Client.setCredentials(token);
    await fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) return console.error(err);
      console.log("Token stored to", TOKEN_PATH);
      return res.redirect(
        `http://localhost:3333/google/spreadsheets/update/${planilhaID}`
      );
    });
    return null;
  });
};
