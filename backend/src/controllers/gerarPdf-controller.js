const CreatePDFService = require("../services/pdf-services/CreatePDFService");

exports.gerarPdf = async (req, res) => {
  try {
    const projectId = req.params.id;

    if (!projectId) {
      return res.status(400).send({
        message: "Projeto não encontrado"
      });
    }

    const pageBuffer = await CreatePDFService.execute({
      projectId
    });

    // Headers da resposta:
    res.setHeader("Content-Description", "File Transfer");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment;",
      "filename='Relatorio.pdf'"
    );

    const fileName = "Relatorio_FullPlans.pdf";
    res.attachment(fileName);

    return res.status(200).send(pageBuffer);
  } catch (e) {
    console.log();
    return res.status(400).send({
      message: "Falha ao gerar o PDF!",
      Error: e.message,
    });
  }
};
