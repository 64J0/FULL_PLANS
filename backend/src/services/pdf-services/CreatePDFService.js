const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

const repository = require("../../repositories/projects-repository");

async function CreatePDFService({ projectId }) {
  const projectData = await repository.findProjectById(projectId);

  const templateHtml = fs.readFileSync(
    path.join(
      process.cwd(),
      "src/views/LayoutPDF/template.html"
    ), "utf8"
  );

  const template = handlebars.compile(templateHtml);

  const html = template(
    projectData,
    { allowProtoPropertiesByDefault: true }
  );

  const options = {
    headerTemplate: "<p></p>",
    footerTemplate: "<p></p>",
    displayHeaderFooter: false,
    margin: {
      top: "10px",
      bottom: "30px"
    },
    printBackground: true,
    format: "A4"
  };

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(`data:text/html;charset=UTF-8,${html}`, {
    waitUntil: "networkidle0"
  });

  const pathStyles = path.resolve(
    __dirname,
    "../../views/LayoutPDF/styles.css"
  );
  await page.addStyleTag({ path: pathStyles });

  const pageBuffer = await page.pdf(options);
  await browser.close();

  return pageBuffer;
}

exports.execute = CreatePDFService;