const repository = require("../repositories/excel-repository");

exports.genExcelFile = async (req, res) => {
  try {
    await repository
      .genExcelFile(req.params.id)
      .then((PlanilhaEditada) => {
        const workBook = PlanilhaEditada.saida;
        const { numGRD } = PlanilhaEditada;
        res.setHeader("Content-Description", "File Transfer");
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment;",
          "filename='Report.xlsx'"
        );
        const fileName = `GRD_${numGRD}.xlsx`;
        // const fileName = "Report.xlsx";
        res.attachment(fileName);
        // workBook.xlsx.writeFile(fileName); // Salva localmente no backend
        return workBook.xlsx.write(res);
      })
      .catch((err) => {
        throw new Error(err);
      });
    return { ok: true };
  } catch (e) {
    return res.status(500).send({
      message: "Falha ao gerar o Excel!",
      Error: e.message,
    });
  }
};
