const { google } = require("googleapis");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.file",
];

const TOKEN_PATH = path.resolve(__dirname, "../../tmp/token.json");
const SHEET_PATH = path.resolve(__dirname, "../../teste.xlsx");

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

async function authorize(response, callback) {
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
      return callback(oAuth2Client);
    })
    .catch((error) => {
      console.log(error);
      return getNewToken(oAuth2Client, response);
    });
}

function uploadSpreadsheet(auth) {
  const fileMetadata = {
    name: "teste.xlsx",
  };

  const media = {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    body: fs.createReadStream(SHEET_PATH),
  };

  const drive = google.drive({ version: "v3", auth });
  return drive.files
    .create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    })
    .then((err, file) => {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("File: ", file);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

exports.create = async (request, response) => {
  try {
    await authorize(response, uploadSpreadsheet)
      .then(() => {
        return response.status(200).send({ ok: true });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    return console.log(error);
  }
};
