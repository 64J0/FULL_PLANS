// const fs = require("fs");
// const path = require('path');
const repository = require("../repositories/projetos-repository");
const createPDF = require("../utils/createPDF");

exports.gerarPdf = async (req, res) => {
  try {
    const projectData = await repository.findProjetoById(req.params.id);

    if (!projectData) {
      return res.status(400).send({
        message: 'Projeto não encontrado'
      });
    }

    const pageBuffer = await createPDF(projectData);

    /*
    const pdfPath = path.join(__dirname, "teste.pdf")
    fs.writeFileSync(pdfPath, pageBuffer);
    */

    res.setHeader("Content-Description", "File Transfer");
    res.setHeader(
      "Content-Type",
      "application/pdf"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment;",
      "filename='Relatorio.pdf'"
    );

    const fileName = `Relatorio_${projectData.numGRD}.pdf`;
    res.attachment(fileName);

    return res.status(200).send(pageBuffer);
  } catch (e) {
    console.log()
    return res.status(400).send({
      message: "Falha ao gerar o PDF!",
      Error: e.message,
    });
  }
};
