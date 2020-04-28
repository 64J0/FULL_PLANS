const { google } = require("googleapis");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

const excelRepository = require("../../repositories/excel-repository");

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.file",
];

const TOKEN_PATH = path.resolve(__dirname, "../../../tmp/token.json");
// const SHEET_PATH = path.resolve(__dirname, "../../assets/teste.xlsx");

const APIcredentials = {
  clientId: String(process.env.CLIENT_ID),
  clientSecret: String(process.env.CLIENT_SECRET),
  redirectUri: JSON.parse(process.env.REDIRECT_URIS),
};

function getNewToken(oAuth2Client, response) {
  const authUrl = oAuth2Client.generateAuthUrl({
    scope: SCOPES,
  });
  return response.redirect(authUrl);
}

async function authorize(response, callback, idProject) {
  const oAuth2Client = new google.auth.OAuth2(
    APIcredentials.clientId,
    APIcredentials.clientSecret,
    APIcredentials.redirectUri[1]
  );

  return fs.promises
    .readFile(TOKEN_PATH)
    .then((token, error) => {
      if (error) {
        throw new Error(error);
      }
      oAuth2Client.setCredentials(JSON.parse(token));
      return callback(oAuth2Client, idProject);
    })
    .catch((error) => {
      console.log(error);
      return getNewToken(oAuth2Client, response);
    });
}

async function uploadSpreadsheet(auth, idProject) {
  let worksheet_PATH = path.resolve(__dirname);

  await excelRepository
    .genExcelFile(idProject)
    .then(async (PlanilhaEditada) => {
      const workBook = PlanilhaEditada.saida;
      const { numGRD } = PlanilhaEditada;

      const fileMetadata = {
        name: `GRD_${numGRD}.xlsx`,
      };

      // Salva localmente no backend
      await workBook.xlsx.writeFile(fileMetadata.name);
      worksheet_PATH = path.resolve(__dirname, `../../../${fileMetadata.name}`);

      const media = {
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        body: fs.createReadStream(worksheet_PATH),
      };

      return {
        resource: fileMetadata,
        media,
        fields: "id",
      };
    })
    .then(async (resourceObject) => {
      const drive = google.drive({ version: "v3", auth });
      return drive.files.create(resourceObject);
    })
    .then((result, err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File: ", result);
      }
    })
    .then(async () => {
      const fileExists = await fs.promises.stat(worksheet_PATH);

      if (fileExists) {
        return fs.promises.unlink(worksheet_PATH);
      }
      return null;
    })
    .catch((error) => {
      return console.log(error);
    });
}

exports.create = async (request, response) => {
  const idProject = request.params.id;

  if (!idProject) {
    return response
      .status(400)
      .send("Couldn't find the project with the informed ID");
  }

  try {
    await authorize(response, uploadSpreadsheet, idProject)
      .then(() => {
        console.log("Vim pra cá");
        return response.status(200).send({ ok: true });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    return console.log(error);
  }
};
