const { google } = require("googleapis");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const url = require("url");

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.file",
];

const TOKEN_PATH = path.resolve(__dirname, "../../../tmp/token.json");

const APIcredentials = {
  clientId: String(process.env.CLIENT_ID),
  clientSecret: String(process.env.CLIENT_SECRET),
  redirectUri: JSON.parse(process.env.REDIRECT_URIS),
};

/**
 * This is the function that manages to get a token.json file with the
 * credentials of the system user.
 * @param {Object} oAuth2Client
 * @param {Object} response
 */
function getNewToken(oAuth2Client, response) {
  const authUrl = oAuth2Client.generateAuthUrl({
    scope: SCOPES,
  });
  return response.redirect(authUrl);
}

/**
 * This function deals with the authorization of requests to the Google
 * Drive API. If the server doesn't have a token.json file with credentials
 * to authorize the request, then, this function will call another function
 * that will manage to get those credentials and create a new local file
 * to store the data.
 * @param {Object} response The response Object of Express
 * @param {Function} callback A callback function
 * @param {Object} projectData The data of a specific project in database
 */
async function authorize(response, callback, projectData) {
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
      return callback(oAuth2Client, projectData, response);
    })
    .catch((error) => {
      console.log(error);
      return getNewToken(oAuth2Client, response);
    });
}

async function downloadFiles(auth, projectData, response) {
  const { infoProjetos } = projectData;
  const IDs = [];

  infoProjetos.map((info) => {
    const linkParsed = url.parse(info.linkDesenho, true);
    const idInQuery = linkParsed.query.id;
    return IDs.push(idInQuery);
  });

  const pathResolved = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "./tmp/photo.txt"
  );
  const dest = fs.createWriteStream(pathResolved);

  const drive = google.drive({ version: "v3", auth });
  return drive.files.get(
    {
      fileId: IDs[0],
      alt: "media",
    },
    { responseType: "stream" },
    (err, res) => {
      res.data
        .on("end", () => {
          console.log("Done");
        })
        .on("error", (err) => {
          console.log("Error", err);
        })
        .pipe(response);
    }
  );
}

const Projetos = mongoose.model("Projetos");

exports.download = async (request, response) => {
  const { id } = request.params;

  try {
    const project = await Projetos.findById(id);
    if (!project) throw new Error("Can't find a project with the informed ID");

    await authorize(response, downloadFiles, project)
      .then((result) => {
        console.log(result);
        return response.status(200).send({ ok: true });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    return response.status(400).send({ error: err });
  }
};
