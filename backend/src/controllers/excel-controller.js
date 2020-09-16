const repository = require("../repositories/excel-repository");
const AppError = require("../errors/AppError");

exports.genExcelFile = async (req, res, next) => {
  try {
    await repository
      .genExcelFile({ projectId: req.params.id })
      .then((spreadsheet) => {
        const workBook = spreadsheet.editedSpreadsheet;
        const { numGRD } = spreadsheet;

        // Headers da resposta
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

        // O nome do arquivo que será enviado
        const fileName = `GRD_${numGRD}.xlsx`;

        // const fileName = "Report.xlsx";
        res.attachment(fileName);

        return workBook.xlsx.write(res);
      })
      .catch((err) => {
        throw new Error(err);
      });
    return { ok: true };
  } catch (e) {
    return next(
      new AppError("Falha ao gerar o Excel!", 500)
    );
  }
};
