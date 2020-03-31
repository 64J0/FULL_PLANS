const repository = require("../repositories/excel-repository");

exports.genExcelFile = async (req, res) => {
  try {
    await repository
      .genExcelFile(req.params.id)
      .then(workBook => {
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
        // var fileName = String('GRD_' + Date.now() + '.xlsx');
        const fileName = "Report.xlsx";
        res.attachment(fileName);
        // workBook.xlsx.writeFile(fileName); // Salva localmente no backend
        return workBook.xlsx.write(res).then(() => {
          res.end();
        });
      })
      .catch(err => {
        return res.status(500).send({ Error: err });
      });
    return res.status(200).send({ ok: true });
  } catch (e) {
    return res.status(500).send({
      message: "Falha ao gerar o Excel!",
      Error: e
    });
  }
};
