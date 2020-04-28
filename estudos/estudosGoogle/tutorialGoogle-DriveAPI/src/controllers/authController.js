const { google } = require("googleapis");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const TOKEN_PATH = path.resolve(__dirname, "../../tmp/token.json");

const APIcredentials = {
  clientId: String(process.env.CLIENT_ID),
  clientSecret: String(process.env.CLIENT_SECRET),
  redirectUri: JSON.parse(process.env.REDIRECT_URIS),
};

exports.auth = async (request, response) => {
  const { code } = request.query;

  const oAuth2Client = new google.auth.OAuth2(
    APIcredentials.clientId,
    APIcredentials.clientSecret,
    APIcredentials.redirectUri[1]
  );

  try {
    oAuth2Client.getToken(code, async (err, token) => {
      if (err) {
        return console.error("Error trying to retrieve access token", err);
      }
      oAuth2Client.setCredentials(token);
      await fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
        return response.send({ message: "Token has been correctly storaged." });
      });
      return null;
    });
  } catch (err) {
    return console.log("Error found while trying this operation: \n", err);
  }
};
