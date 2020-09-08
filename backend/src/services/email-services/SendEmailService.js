const Mailgun = require("mailgun-js");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function SendEmailService({ name, email, phone, necessity }) {
  const api_key = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const from_who = process.env.MAILGUN_FROM_WHO;

  const templateHtml = fs.readFileSync(path.join(process.cwd(), "src/views/LayoutEmail/template.hbs"), "utf8");

  const template = handlebars.compile(templateHtml);

  const html = template(
    { name, email, phone, necessity },
    { allowProtoPropertiesByDefault: true }
  );

  const mailgun = new Mailgun({ apiKey: api_key, domain });

  const data = {
    from: from_who,
    to: "vinigaio97@gmail.com",
    subject: "[Full Form] Nova mensagem cadastrada",
    html
  };

  return mailgun
    .messages()
    .send(data)
    .then(res => { console.log(res); })
    .catch(err => { console.log(err); });
}

exports.execute = SendEmailService;